import { useEffect, useLayoutEffect, useState, useRef } from "react";
import LinkButton from "../components/LinkButton";
import Timestamp from "../components/TimeStamp";
import Spinner from "../components/Spinner";
import Popup from "../components/Popup";
import Dropdown from "../components/DropDown";
import ScrollToTop from "../components/ScrollToTop";
import { Car, CarResponse } from "../models/Car";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import {
	cleanAndParsePrice,
	convertToNumber,
	cutStringFromSecondSpace,
	numberFormat,
	truncateString,
	fetchData,
} from "../utils/Utils";
import {
	BoldText,
	CarCard,
	CarCardContainer,
	CarDetails,
	CarGrid,
	CarImage,
	CarInfo,
	FooterText,
	ResultCountText,
	SearchResultContainer,
	SearchResultText,
	TimeStampText,
} from "../components/Styles";
import {
	CarName,
	CarPrice,
	CarSpec,
	CarSpecLabel,
	CarSpecValue,
	CarSpecs,
	SpecsText,
} from "../components/Styles";

const BASE_URL = import.meta.env.VITE_API_URL;
const DETAILS_URL = import.meta.env.VITE_DETAILS_URL;

function getWindowHeight() {
	return window.innerHeight;
}

interface SearchParams {
	maker: string | null;
	model: string | null;
	pricefrom: string | null;
	priceto: string | null;
	yearfrom: string | null;
	yearto: string | null;
	searchtext: string | null;
	mileage: string | null;
}

const Home = () => {
	const scrollerRef = useRef<HTMLDivElement>(null);

	const [windowHeight, setWindowHeight] = useState(getWindowHeight());
	const [sortOrder, setSortOrder] = useState<string | "">();

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [searchParams, setSearchParams] = useState<SearchParams>({
		maker: null,
		model: null,
		pricefrom: null,
		priceto: null,
		yearfrom: null,
		yearto: null,
		searchtext: null,
		mileage: null,
	});
	const [noResults, setNoResults] = useState(false);
	const [resultCount, setResultCount] = useState<number | null>(null);

	const openPopup = () => setIsPopupOpen(true);
	const closePopup = () => setIsPopupOpen(false);

	// the search parameters 
	const handleSearch = (
		maker: string | null,
		model: string | null,
		pricefrom: string | null,
		priceto: string | null,
		yearfrom: string | null,
		yearto: string | null,
		searchtext: string | null,
		mileage: string | null
	) => {
		setSearchParams({
			maker,
			model,
			pricefrom,
			priceto,
			yearfrom,
			yearto,
			searchtext,
			mileage,
		});
		closePopup();
	};

	const sortbyOptions: string[] = [
		"Price ascending",
		"Price descending",
		"Mileage ascending",
		"Mileage descending",
		"Year ascending",
		"Year descending",
	];

	const [showSpinner, setShowSpinner] = useState(false);

	useLayoutEffect(() => {
		document.body.style.backgroundColor = "#ffffff";
	}, []); // Add an empty dependency array to run this effect only once

	// Set sortby value from dropdown
	const handleChangeSortOrder = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSortOrder(event.target.value);
	};

	// Recalculate window height on window resize
	useEffect(() => {
		const handleResize = () => {
			setWindowHeight(getWindowHeight());
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	type CarsQueryKey = (string | SearchParams | undefined)[];

	const fetchCars = async ({
		pageParam = 1,
		queryKey,
	}: QueryFunctionContext<CarsQueryKey, number>): Promise<CarResponse> => {
		const [_, searchParams, sortOrder]: CarsQueryKey =
			queryKey as CarsQueryKey;

		const pageSize = 8;
		const start = (pageParam - 1) * pageSize;
		const end = start + pageSize;

		// Build the query parameters
		const queryParams: string[] = [];

		// Add parameters to the query string if they are provided
		if (searchParams && typeof searchParams === "object") {
			if (searchParams.maker) {
				queryParams.push(
					`maker=${encodeURIComponent(searchParams.maker)}`
				);
			}
			if (searchParams.model) {
				queryParams.push(
					`model=${encodeURIComponent(searchParams.model)}`
				);
			}
			if (searchParams.yearfrom) {
				queryParams.push(`yearfrom=${searchParams.yearfrom}`);
			}
			if (searchParams.yearto) {
				queryParams.push(`yearto=${searchParams.yearto}`);
			}

			if (searchParams.pricefrom) {
				const parsedPricefrom = cleanAndParsePrice(
					searchParams.pricefrom
				);
				queryParams.push(`pricefrom=${parsedPricefrom}`);
			}

			if (searchParams.priceto) {
				const parsedPriceto = cleanAndParsePrice(searchParams.priceto);
				queryParams.push(`priceto=${parsedPriceto}`);
			}

			if (searchParams.mileage) {
				const mileage = searchParams.mileage;

				// Clean the string by removing spaces, commas, and " km" or "km"
				const cleanedMileage = mileage
					?.replace(/\s+/g, "")
					.replace(/,/, "")
					.replace(/km$/, "")
					.replace(/ km$/, "");

				// Check if the cleaned string is a valid number and parse it
				const parsedMileage =
					cleanedMileage && !isNaN(parseInt(cleanedMileage))
						? parseInt(cleanedMileage)
						: 0;

				queryParams.push(`mileage=${parsedMileage}`);
			}

			if (searchParams.searchtext) {
				queryParams.push(
					`searchtext=${encodeURIComponent(searchParams.searchtext)}`
				);
			}
		}
		if (sortOrder) {
			queryParams.push(`sort=${sortOrder}`);
		}

		// Join the query parameters with '&' and construct the full URL
		const queryString =
			queryParams.length > 0 ? `&${queryParams.join("&")}` : "";
		const url =
			BASE_URL + `/api/cars?start=${start}&end=${end}${queryString}`;

		interface Results {
			results: any[];
			resultCount: number;
		}

		const response = await fetchData<Results>(url);
		const { results, resultCount } = response ?? {};

		setResultCount(resultCount ?? 0);

		return {
			data: results ?? [],
			nextPage: results?.length === pageSize ? pageParam + 1 : 1,
		};
	};

	const {
		data,
		isError,
		isLoading,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["cars", searchParams, sortOrder],
		queryFn: fetchCars,
		initialPageParam: 1,
		getNextPageParam: (lastPage: CarResponse) => {
			return lastPage.data.length === 8 ? lastPage.nextPage : undefined;
		},
	});

	// Handle success/error OUTSIDE the hook with useEffect
	useEffect(() => {
		if (data) {
			console.log("Data loaded:", data);
		}
	}, [data]);

	useEffect(() => {
		if (isError) {
			setNoResults(true);
		}
	}, [isError]);

	useEffect(() => {
		if (isFetchingNextPage) {
			setShowSpinner(true);
			const timeoutId = setTimeout(() => {
				setShowSpinner(false);
			}, 700);
			return () => {
				clearTimeout(timeoutId);
			};
		} else {
			const timeoutId = setTimeout(() => {
				setShowSpinner(false);
			}, 1700);
			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [isFetchingNextPage]);

	if (isLoading) {
		return (
			<p>
				<Spinner />
			</p>
		);
	}

	if (isError) {
		return <p>Something went wrong while fetching cars</p>;
	}

	const allCars = (data?.pages ?? []).flatMap((page: CarResponse) => {
		if (Array.isArray(page.data) && page.data.length > 0) {
			return page.data;
		}
		return [];
	});

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;

		// Add a buffer so that scroll is triggered a bit before hitting the bottom
		const bottom =
			target.scrollHeight - target.scrollTop - target.clientHeight < 50;

		if (bottom && !isFetchingNextPage && hasNextPage) {
			fetchNextPage();
		}
	};

	const formattedParams = [
		{
			label: "Maker/Model",
			value: `${searchParams.maker || ""} ${searchParams.model || ""}`,
		},
		{
			label: "Price",
			value: `${searchParams.pricefrom || ""} - ${
				searchParams.priceto || ""
			}`,
		},
		{
			label: "Year",
			value: `${searchParams.yearfrom || ""} - ${
				searchParams.yearto || ""
			}`,
		},
		{ label: "Mileage Up To", value: searchParams.mileage },
		{ label: "Search Text", value: searchParams.searchtext },
	].filter((param) => {
		const value = param.value?.trim();
		return (
			value !== null &&
			value !== undefined &&
			value !== "" &&
			value !== "-" &&
			value !== " -"
		);
	});

	const handleRemoveParam = (label: string) => {
		switch (label) {
			case "Maker/Model":
				setSearchParams((prevParams) => ({
					...prevParams,
					maker: "",
					model: "",
				}));
				break;
			case "Price":
				setSearchParams((prevParams) => ({
					...prevParams,
					pricefrom: "",
					priceto: "",
				}));
				break;
			case "Year":
				setSearchParams((prevParams) => ({
					...prevParams,
					yearfrom: "",
					yearto: "",
				}));
				break;
			case "Mileage Up To":
				setSearchParams((prevParams) => ({
					...prevParams,
					mileage: "",
				}));
				break;
			case "Search Text":
				setSearchParams((prevParams) => ({
					...prevParams,
					searchtext: "",
				}));
				break;
			default:
				break;
		}
	};

	return (
		<div
			style={{
				marginTop: "45px",
				padding: "20px",
				overflowY: "auto",
				height: "100vh",
				boxSizing: "border-box",
			}}
			ref={scrollerRef}
			onScroll={handleScroll} // Handle scroll events
		>
			{isPopupOpen && (
				<Popup
					onClose={closePopup}
					onSearch={handleSearch}
					searchParams={searchParams}
				/>
			)}
			<SearchResultContainer>
				{formattedParams.length > 0 ? (
					formattedParams.map((param, index) => (
						<div key={index}>
							<SearchResultText>
								<button
									style={closeButtonStyle}
									onClick={() =>
										handleRemoveParam(param.label)
									}
								>
									&times;&nbsp; {/* X button */}
								</button>
								{param.value}
							</SearchResultText>
						</div>
					))
				) : (
					<div></div>
					// <div>No search criteria entered. Displaying all cars.</div>
				)}
			</SearchResultContainer>
			<CarCardContainer>
				<LinkButton
					url="#"
					onClick={openPopup}
					buttonText="Search"
					isPopUp={false}
					type="button"
					style={searchButtonStyle}
					searchParams={searchParams}
				/>
				<ResultCountText>
					Total Results: <BoldText>{resultCount}</BoldText>
					<Dropdown
						id="price-select-from"
						value={sortOrder || ""}
						onChange={handleChangeSortOrder}
						sortby={sortbyOptions}
						title={"Sort By"}
						type="sortby"
					/>
				</ResultCountText>
				<CarGrid>
					{allCars?.map((car: Car) => (
						<CarCard key={car.id}>
							<CarImage src={car.image_url} alt={car.name} />
							<CarInfo>
								<CarName>
									{cutStringFromSecondSpace(car.name)}
								</CarName>
								<CarDetails>
									{truncateString(car.details)}
								</CarDetails>
								<CarPrice>
									{numberFormat(
										convertToNumber(car.price.toString())
									)}
								</CarPrice>
								<CarSpecs>
									<CarSpec>
										<CarSpecLabel>Year:</CarSpecLabel>
										<CarSpecValue>
											<SpecsText>{car.year}</SpecsText>
										</CarSpecValue>
									</CarSpec>
									<CarSpec>
										<CarSpecLabel>Kilometers:</CarSpecLabel>
										<CarSpecValue>
											<SpecsText>{car.mileage}</SpecsText>
										</CarSpecValue>
									</CarSpec>
									<CarSpec>
										<CarSpecLabel>Fuel:</CarSpecLabel>
										<CarSpecValue>
											<SpecsText>
												{car.fuel_type}
											</SpecsText>
										</CarSpecValue>
									</CarSpec>
									<CarSpec>
										<CarSpecLabel>
											Transmission:
										</CarSpecLabel>
										<CarSpecValue>
											<SpecsText>
												{car.transmission}
											</SpecsText>
										</CarSpecValue>
									</CarSpec>
									<CarSpec>
										<CarSpecLabel>Drive Type:</CarSpecLabel>
										<CarSpecValue>
											<SpecsText>
												{car.drive_type}
											</SpecsText>
										</CarSpecValue>
									</CarSpec>
								</CarSpecs>
								<div>&nbsp;</div>
								<LinkButton
									url={DETAILS_URL + `${car.url}`}
									buttonText="Details"
									isPopUp={true}
									type="button"
									searchParams={undefined}
								/>
							</CarInfo>
						</CarCard>
					))}
				</CarGrid>
				<ScrollToTop
					scrollerRef={scrollerRef as React.RefObject<HTMLDivElement>}
				/>
			</CarCardContainer>
			{/* Conditionally render the spinner when fetching next page */}
			{showSpinner && <Spinner />}

			<FooterText>
				{!hasNextPage && (
					<TimeStampText>
						<BoldText>{resultCount}</BoldText>
						<FontAwesomeIcon
							icon={faCarSide}
							title={`${searchParams.maker}`}
							style={iconStyle}
						/>
						found at
						<BoldText>
							<Timestamp />.
						</BoldText>
					</TimeStampText>
				)}
			</FooterText>
		</div>
	);
};

export default Home;

//#region Additional styles

// Style for the search button
const searchButtonStyle: React.CSSProperties = {
	display: "inline-flex",
	alignItems: "center",
	padding: "0.5rem 0.8rem",
	marginBottom: "0.75rem",
	marginRight: "0.25rem",
	fontSize: "1rem",
	fontWeight: "600",
	color: "white",
	textDecoration: "none",
	backgroundColor: "#01767e",
	border: "1px solid transparent",
	borderRadius: "0.375rem",
	cursor: "pointer",
	userSelect: "none",
	position: "relative",
	right: "-85px",
	float: "right",
};

// Close button style (x) for selected search params
const closeButtonStyle: React.CSSProperties = {
	display: "inline-block",
	background: "transparent",
	fontSize: "17px",
	cursor: "pointer",
};

// Footer car icon
const iconStyle = {
	color: "#01767e", // Icon color
	fontSize: "1.2rem", // Icon size
	marginLeft: "4px",
	marginRight: "5px",
};
//#endregion
import React, { useEffect, useRef, useState } from "react";
import Autocomplete from "./Autocomplete";
import Dropdown from "./DropDown";
import LinkButton from "./LinkButton";
import TextField from "./TextField";
import { TextBoxContainer } from "./Styles";
import { SearchParams } from "../models/SearchParams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RemoveIcon } from "./Styles";

const iconStyle = {
	fontSize: "1.2rem", // Icon size
	marginTop: "10px",
	color: "#00737b",
	marginRight: "0.25em",
};

interface PopupProps {
	onClose: () => void;
	onSearch: (
		maker: string,
		model: string,
		pricefrom: string,
		priceto: string,
		yearfrom: string,
		yearto: string,
		mileage: string,
		searchtext: string
	) => void;
	searchParams: SearchParams;
}

//#region additional styles for Popup
const overlayStyle: React.CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 1000, // keeps overflay over other pages/items
};

const modalStyle: React.CSSProperties = {
	background: "white",
	padding: "20px",
	borderRadius: "5px",
	width: "400px",
	height: "510px",
	boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
	position: "relative", // For positioning the close button
};

const closeButtonStyle: React.CSSProperties = {
	position: "absolute",
	top: "-10px",
	right: "10px",
	border: "none",
	background: "transparent",
	fontSize: "35px",
	cursor: "pointer",
};

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
	float: "right",
};
//#endregion

const Popup = ({ onClose, onSearch, searchParams }: PopupProps) => {
	const [selectedMaker, setSelectedMaker] = useState<string | null>(
		searchParams.maker
	);
	const [selectedModel, setSelectedModel] = useState<string | null>(
		searchParams.model
	);
	// const [searchText, setSearchText] = useState('');
	const [searchText, setSearchText] = useState<string | null>(
		searchParams.searchtext
	);
	const [yearFrom, setYearFrom] = useState<string | null>(
		searchParams.yearfrom
	);
	const [yearTo, setYearTo] = useState<string | null>(searchParams.yearto);
	const [priceFrom, setPriceFrom] = useState<string | null>(
		searchParams.pricefrom
	);
	const [priceTo, setPriceTo] = useState<string | null>(searchParams.priceto);
	const [mileage, setMileage] = useState<string | null>(searchParams.mileage);

	const inputRef = useRef(null);

	const years: number[] = Array.from(
		{ length: 2025 - 1920 + 1 },
		(_, index) => 2025 - index
	);

	const prices: string[] = [
		500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
		10000, 12500, 15000, 17500, 20000, 25000, 30000, 40000, 50000, 75000,
		100000,
	].map((price) =>
		new Intl.NumberFormat("fi-FI", {
			style: "currency",
			currency: "EUR",
			maximumFractionDigits: 0,
		}).format(price)
	);

	const handleMakerSelect = (maker: string) => {
		setSelectedMaker(maker);
		setSelectedModel(null); // Reset model when maker changes
	};

	const handleModelSelect = (model: string) => {
		setSelectedModel(model);
	};

	// set setter value (Price From/To, Year From/To, Mileage )
	const handleChangeValue =
		(setter: (value: string) => void) =>
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setter(event.target.value);
		};

	// set setter value to null/empty
	const handleRemoveValue = (setter: (value: null) => void) => {
		setter(null);
	};

	const handleChangeSearchText = (value: string) => {
		setSearchText(value);
	};

	useEffect(() => {
		if (selectedMaker) {
			setSelectedModel(null);
		}
	}, [selectedMaker]);

	// Form Events

	// Handler to submit on ENTER
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevent default action like form submission
			handleSearch(); // Trigger the search manually
		}
	};

	// Create Mileages up (Array)
	const createDistanceArray = (): string[] => {
		const distances: string[] = [];
		const startValues = [5000, 10000, 20000]; // Starting values in km
		const limit = 200000; // Limit value in km
		const increment = 10000; // Increment value in km

		// Add the initial values
		for (const value of startValues) {
			distances.push(`${value.toLocaleString()} km`);
		}

		// Continue adding values from the last value in startValues
		for (
			let i = startValues[startValues.length - 1] + increment;
			i <= limit;
			i += increment
		) {
			distances.push(`${i.toLocaleString()} km`);
		}

		return distances;
	};

	const mileagesUpTo = createDistanceArray();

	const handleSearch = () => {
		onSearch(
			selectedMaker ?? "",
			selectedModel ?? "",
			priceFrom ?? "",
			priceTo ?? "",
			yearFrom ?? "",
			yearTo ?? "",
			searchText ?? "",
			mileage ?? ""
		);
	};

	return (
		<div style={overlayStyle}>
			<div style={modalStyle}>
				<button style={closeButtonStyle} onClick={onClose}>
					&times; {/* X button */}
				</button>
				<div>
					<br />
				</div>
				<div>
					<span>
						{
							<FontAwesomeIcon
								icon={["fas", "search"]}
								style={iconStyle}
								title="Search"
							/>
						}
						Search
					</span>
				</div>
				<div>
					<br />
				</div>
				<Autocomplete
					id="maker-autocomplete" // Unique ID for the maker autocomplete
					value={searchParams.maker || ""}
					onSearch={handleMakerSelect}
					isMaker={true}
					// key={selectedMaker} // Add a key prop to reset the state when maker changes
				/>
				{<div className="div-space"></div>}
				{/* Only render the model Autocomplete if a maker is selected */}
				{selectedMaker && (
					<Autocomplete
						id="model-autocomplete" // Unique ID for the model autocomplete
						onSearch={handleModelSelect}
						isMaker={false}
						value={searchParams.model || ""}
						make={selectedMaker} // Pass the selected maker
						disabled={false} // Enable the model Autocomplete
					/>
				)}
				<div className="disabled">
					{!selectedMaker && (
						<Autocomplete
							id="disabled" 
							isMaker={false}
							value={""}
							disabled={true} // Enable the model Autocomplete
							onSearch={function (): void {}}
						/>
					)}
				</div>
				<div className="div-space"></div>
				<>
					{priceFrom !== null && priceFrom !== "" && (
						<RemoveIcon
							$top="200px"
							$right="214px"
							title="Remove"
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveValue(setPriceFrom);
							}}
						>
							<div className="ic_remove"></div>
						</RemoveIcon>
					)}
					{priceTo !== null && priceTo !== "" && (
						<RemoveIcon
							$top="200px"
							$right="26px"
							title="Remove"
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveValue(setPriceTo);
							}}
						>
							<div className="ic_remove"></div>
						</RemoveIcon>
					)}
					{yearFrom !== null && yearFrom !== "" && (
						<RemoveIcon
							$top="251px"
							$right="214px"
							title="Remove"
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveValue(setYearFrom);
							}}
						>
							<div className="ic_remove"></div>
						</RemoveIcon>
					)}
					{yearTo !== null && yearTo !== "" && (
						<RemoveIcon
							$top="251px"
							$right="26px"
							title="Remove"
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveValue(setYearTo);
							}}
						>
							<div className="ic_remove"></div>
						</RemoveIcon>
					)}
					{mileage !== null && mileage !== "" && (
						<RemoveIcon
							$top="301px"
							$right="214px"
							title="Remove"
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveValue(setMileage);
							}}
						>
							<div className="ic_remove"></div>
						</RemoveIcon>
					)}
					{searchText !== null && searchText !== "" && (
						<RemoveIcon
							$top="368px"
							$right="26px"
							title="Remove"
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveValue(setSearchText);
							}}
						>
							<div className="ic_remove"></div>
						</RemoveIcon>
					)}
					<div className="w_flex">
						<Dropdown
							id="price-select-from"
							value={priceFrom || ""}
							onChange={handleChangeValue(setPriceFrom)}
							prices={prices}
							title={"Price From"}
							type="prices"
						/>
						<Dropdown
							id="price-select-to"
							value={priceTo || ""}
							onChange={handleChangeValue(setPriceTo)}
							prices={prices}
							title={"Price To"}
							type="prices"
						/>
					</div>
					<div className="w_flex">
						<Dropdown
							id="year-select-from"
							value={yearFrom || ""}
							onChange={handleChangeValue(setYearFrom)}
							years={years}
							title={"Year From"}
							type="years"
						/>
						<Dropdown
							id="year-select-to"
							value={yearTo || ""}
							onChange={handleChangeValue(setYearTo)}
							years={years}
							title={"Year To"}
							type="years"
						/>
					</div>
					<div className="w_flex">
						<Dropdown
							id="mileage-dropdown"
							value={mileage || ""}
							onChange={handleChangeValue(setMileage)}
							mileage={mileagesUpTo}
							title="Mileage up to"
							type="mileage"
						/>
					</div>
				</>
				<div className="dd_flex_left">&nbsp;</div>
				<TextBoxContainer>
					<TextField
						placeholder={searchText || "Search a car ..."}
						type="text"
						value={searchText || ""}
						onChange={handleChangeSearchText}
						ref={inputRef}
						onKeyDown={handleKeyDown} // Add the keydown handler
					/>
				</TextBoxContainer>
				<div className="sm_rel_up">
					<LinkButton
						url="#"
						onClick={handleSearch}
						buttonText="Search"
						isPopUp={false}
						type="submit"
						style={searchButtonStyle}
					/>
				</div>
			</div>
		</div>
	);
};

export default Popup;

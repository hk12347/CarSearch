import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import useData from "../hooks/useData";
import ScrollToSelectedListItem from "./ScrollToSelectedListItem";
import "../styles/Autocomplete.css"; // For styling

const BASE_URL = import.meta.env.VITE_API_URL;

interface Option {
	item: string;
}

interface AutocompleteProps {
	onSearch: (value: string) => void;
	isMaker: boolean;
	make?: string; // Make is optional
	value: string;
	disabled?: boolean;
	id: string;
}

// Debounce hook
const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

const Autocomplete = ({
	onSearch,
	isMaker,
	make,
	value,
	disabled,
	id,
}: AutocompleteProps) => {
	const [showOptions, setShowOptions] = useState(false);
	const [selectedMaker, setSelectedMaker] = useState<string | null>(
		isMaker ? value : null
	); // Set initial state for maker
	const [selectedModel, setSelectedModel] = useState<string | null>(
		!isMaker ? value : null
	); // Set initial state for model
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
	const [options, setOptions] = useState<Option[]>([]);
	const [titleText, setTitleText] = useState<string>(
		isMaker ? "Maker" : "Model"
	);

	const optionsContainerRef = useRef<HTMLDivElement | null>(null);
	const autocompleteContainerRef = useRef<HTMLDivElement | null>(null);
	const debouncedSearchTerm = useDebounce(searchTerm, 200); // Adjust delay as needed

	// API URL
	let API_URL = isMaker
		? BASE_URL + `/api/cars/make`
		: BASE_URL + `/api/cars/model/${make}`;

	// Non-selectable items - A -> Z and "Most searched"
	const nonSelectableItems = [
		...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A to Z
		"Most Searched",
	];

	if (make == "") return;

	const [data] = useData<Option>(API_URL); // Assuming useData returns the data directly

	useEffect(() => {
		if (data) {
			// Check if Car Model is in data -> Don't set it up, if user selects new Maker (from popup)
			const selectedValue = data.some(
				(option) => option.item === selectedModel
			);
			if (!isMaker && !selectedValue) {
				setSelectedModel(null);
				setSearchTerm("");
			}
			setOptions(data);
			setFilteredOptions(data);
		} else {
			console.log("No data received from API");
			setOptions([]); // Reset options if no data
		}
	}, [data]);

	// Handle click outside of options
	const handleOutsideClick = (event: MouseEvent) => {
		if (
			autocompleteContainerRef.current &&
			!autocompleteContainerRef.current.contains(event.target as Node) &&
			optionsContainerRef.current &&
			!optionsContainerRef.current.contains(event.target as Node)
		) {
			setShowOptions(false);
		}
	};

	// useEffect (eventListener) to close options, if user click outside of options popup
	useEffect(() => {
		document.addEventListener("click", handleOutsideClick);

		if (showOptions) {
			document.body.style.overflow = "hidden";
			document.body.classList.add("no-scroll");
		} else {
			document.body.style.overflow = "auto";
			document.body.classList.remove("no-scroll");
		}

		// Cleanup the event listener on component unmount or when showOptions changes
		return () => {
			document.removeEventListener("click", handleOutsideClick);
			document.body.classList.remove("no-scroll");
		};
	}, [showOptions]);

	useEffect(() => {
		if (!disabled) {
			doSearch(debouncedSearchTerm);
		}
	}, [debouncedSearchTerm, disabled]);

	// Search Handler
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = options.filter((option) =>
			option.item.toLowerCase().match(new RegExp(`^${term}`, "i"))
		);
		setFilteredOptions(filtered);
	};

	const doSearch = (term: string) => {
		setFilteredOptions(
			options.filter((option) =>
				option.item.toLowerCase().match(new RegExp(`^${term}`, "i"))
			)
		);
		onSearch(term);
	};

	const handleSelect = (option: Option) => {
		if (isMaker) {
			setSelectedModel(null);
		} // Do this first - (clear model if selected maker is changed)

		if (nonSelectableItems.includes(option.item)) {
			// Do nothing if it's one of the non-selectable items
			return;
		}

		if (isMaker) {
			setSelectedMaker(option.item);
			setSelectedModel(null); // Clear model when a new maker is selected
			setSearchTerm(option.item); // Update search term to selected maker
		} else {
			setSelectedModel(option.item);
			setSearchTerm(option.item); // Update search term to selected model
		}

		setShowOptions(false);
		setFilteredOptions(options); // Reset filtered options
	};

	const handleRemove = () => {
		if (isMaker) {
			setSelectedMaker(null);
			setSearchTerm("");
		} else {
			setSelectedModel(null);
			setSearchTerm("");
		}
		setFilteredOptions(options); // Reset filtered options
	};

	const formattedSelectedOption = (selectedOption: string | null) =>
		selectedOption
			? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)
			: "";

	// Effect to ensure the search term is synced with the selectedOption when reopened
	useEffect(() => {
		if (isMaker) {
			setSearchTerm(selectedMaker ?? ""); // Re-sync searchTerm with selectedMaker when opening the search again
		} else {
			setSearchTerm(selectedModel ?? ""); // Re-sync searchTerm with selectedModel when opening the search again
		}
	}, [isMaker, selectedMaker, selectedModel]);

	return (
		<div
			className="autocomplete-container"
			id={id}
			ref={autocompleteContainerRef}
		>
			<div
				className="model-text"
				onClick={() => setShowOptions((prev) => !prev)}
			>
				<div className="ac-text">{titleText}</div>
				<div className="ac-icon">
					<FontAwesomeIcon icon={faArrowDown} />
				</div>
				{(isMaker ? selectedMaker : selectedModel) && (
					<span
						className="selected-option"
						title={
							isMaker
								? selectedMaker
									? selectedMaker
									: "Maker"
								: selectedModel
								? selectedModel
								: "Model"
						}
					>
						{formattedSelectedOption(
							isMaker ? selectedMaker : selectedModel
						)}
					</span>
				)}
				{(isMaker ? selectedMaker : selectedModel) && (
					<FontAwesomeIcon
						icon={faTimesCircle}
						className="remove_icon"
						title="Remove"
						onClick={(e) => {
							e.stopPropagation();
							handleRemove();
						}}
					/>
				)}
			</div>
			{showOptions && (
				<div
					ref={optionsContainerRef}
					className={`options-container ${showOptions ? "show" : ""}`}
				>
					<input
						type="text"
						placeholder={isMaker ? "Search Maker" : "Search Model"}
						value={searchTerm} // Allow typing in the search box
						onChange={handleSearch}
						className="search-input"
						disabled={disabled}
					/>
					<ul className="options-list">
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option, index) => (
								<ScrollToSelectedListItem
									key={option.item}
									isChosen={
										option.item ===
										(isMaker
											? selectedMaker
											: selectedModel)
									}
								>
									<li
										key={option.item}
										onClick={() => handleSelect(option)}
										className={
											nonSelectableItems.includes(
												option.item
											)
												? "non-selectable"
												: ""
										}
									>
										{option.item}
									</li>
								</ScrollToSelectedListItem>
							))
						) : (
							<li>No options available</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Autocomplete;

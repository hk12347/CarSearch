import React from "react";

interface DropDownProps {
	id: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	prices?: string[]; // Optional array of price options
	years?: number[]; // Optional array of years
	mileage?: string[]; // Optional array of mileage options
	sortby?: string[]; // Optional array of sortby options
	title: string; // Title for the dropdown
	type: "prices" | "years" | "mileage" | "sortby"; // Type to determine which options to display
}

const DropDown = ({
	id,
	value,
	onChange,
	prices,
	years,
	mileage,
	sortby,
	title,
	type,
}: DropDownProps) => {
	return (
		<select
			id={id}
			value={value}
			onChange={onChange}
			className={!sortby ? "dropdown" : "m_dropdown"}
		>
			<option value="">{title}</option>
			{type === "years" &&
				years &&
				years.map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			{type === "mileage" &&
				mileage &&
				mileage.map((mile, index) => (
					<option key={index} value={mile}>
						{mile}
					</option>
				))}
			{type === "prices" &&
				prices &&
				prices.map((price, index) => (
					<option key={index} value={price}>
						{price}
					</option>
				))}
			{type === "sortby" &&
				sortby &&
				sortby.map((sort, index) => (
					<option key={sort} value={index}>
						{sort}
					</option>
				))}
		</select>
	);
};

export default DropDown;

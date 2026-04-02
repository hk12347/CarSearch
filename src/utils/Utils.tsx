import axios from "axios";

/**
 * Extracts the first two words from a string, or returns the original string if it has two or fewer words
 * @param {string} str - The input string to process
 * @returns {string} The first two words joined by a space, or the original string
 */
export const cutStringFromSecondSpace = (str: string) => {
	// Split the string by spaces
	const words = str.split(" ");

	// Check if there are at least two words
	if (words.length <= 2 || str.includes("Tesla")) {
		return str; // Return the original string if there are less than or equal to 2 words
	}

	// Join the first two words with a space
	return words.slice(0, 2).join(" ");
};

/**
 * Truncates a string to a maximum length and appends "..." if exceeded.
 * @param {string} str - The input string to truncate
 * @param {number} [maxLength=35] - The maximum length before truncation (default: 35)
 * @returns {string} The truncated string with "..." appended if over maxLength
 */
export function truncateString(str: string, maxLength: number = 35): string {
	if (str.length > maxLength) {
		return str.slice(0, maxLength) + "...";
	}
	return str;
}

/**
 * Formats a number as EUR currency using Finnish locale formatting.
 * @param {number|bigint} value - The numeric value to format
 * @returns {string} The formatted currency string (e.g., "1 234,56 €")
 */
export const numberFormat = (value: number | bigint) =>
	new Intl.NumberFormat("fi-FI", {
		style: "currency",
		currency: "EUR",
	}).format(value);

/**
 * Converts a price string to a number, returning 0 if parsing fails.
 * @param {string} price - The price string to convert
 * @returns {number} The parsed number or 0 if invalid
 */    
export const convertToNumber = (price: string) => {
	// Function to convert price string to a number
	const number = parseFloat(price); // Convert string to number
	return !isNaN(number) ? number : 0; // Return the number or 0 if NaN
};

/**
 * Removes whitespace and euro symbol from a price string, then parses it as an integer.
 * @param {string|undefined} price - The price string to clean and parse
 * @returns {number} The parsed integer or 0 if invalid or undefined
 */
export const cleanAndParsePrice = (price: string | undefined): number => {
	if (!price) return 0;

	const cleanedPrice = price.replace(/\s+/g, "").replace("€", "");
	return !isNaN(parseInt(cleanedPrice)) ? parseInt(cleanedPrice) : 0;
};

/**
 * Fetches data from an API endpoint and returns it as the specified type.
 * @template T - The expected return type of the API response
 * @param {string} apiUrl - The API endpoint URL to fetch from
 * @returns {Promise<T>} A promise that resolves to the typed API response data
 * @throws {AxiosError} Throws an error if the HTTP request fails
 */
export async function fetchData<T>(apiUrl: string): Promise<T> {
	const res = await axios.get(apiUrl);
	return res.data as T;
}

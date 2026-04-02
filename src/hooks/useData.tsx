import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook that fetches data from an API endpoint and manages its state.
 * Automatically cancels requests if the component unmounts or the API URL changes.
 * 
 * @template T - The type of individual items in the returned data array
 * @param {string} apiUrl - The API endpoint URL to fetch from
 * @returns {[T[] | undefined]} A tuple containing the fetched data array or undefined while loading
 * 
 * @example
 * const [cars] = useData<Car>('/api/cars');
 * 
 * @throws Logs errors to console if the request fails (except for canceled requests)
 */
function useData<T>(apiUrl: string): [T[] | undefined] {
	const [data, setData] = useState<T[] | undefined>(undefined);

	useEffect(() => {
		const abortController = new AbortController();

		//disabled component or error -> autocomplete shouldnt request apiURL that include "undefined"
		if (apiUrl.includes("undefined")) {
			return () => {
				abortController.abort(); // Correctly call abort on the instance
			};
		}

		const fetchData = async () => {
			try {
				const response = await axios.get(apiUrl, {
					signal: abortController.signal,
				});
				setData(response.data);
			} catch (error) {
				if (axios.isCancel(error)) {
					console.log("Request canceled:", error.message);
				} else {
					console.error("Error fetching data:", error);
				}
			}
		};
		fetchData();

		// Cleanup function to abort the request if the component unmounts
		return () => {
			abortController.abort(); // Correctly call abort on the instance
		};
	}, [apiUrl]); // Add apiUrl to the dependency array

	return [data];
}

export default useData;

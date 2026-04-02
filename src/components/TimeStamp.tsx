import { useEffect, useState } from "react";

// A Timestamp (DD/MM/YYYY HH:MM:SS)
const Timestamp = () => { 
	const [timestamp, setTimestamp] = useState<string>("");

	useEffect(() => {
		const now = new Date();

		const day = String(now.getDate()).padStart(2, "0");
		const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-based, so we add 1
		const year = now.getFullYear(); // full year (yyyy)

		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		const seconds = String(now.getSeconds()).padStart(2, "0");

		const formattedTimestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
		setTimestamp(formattedTimestamp);
	}, [timestamp]);

	return [timestamp];
};

export default Timestamp;

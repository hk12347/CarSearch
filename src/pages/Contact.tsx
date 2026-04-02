import { useLayoutEffect } from "react";
import { TextBreak } from "../components/Styles";
import Cars from "../assets/cars-fleet.jpg";

const iconStyle: React.CSSProperties = {
	left: "calc(100% - 59%)",
	position: "relative",
	top: "30px",
};

const Contact = () => {
	useLayoutEffect(() => {
		document.body.style.backgroundColor = "#ffffff";
	}, []);

	return (
		<div>
			<TextBreak />
			<img
				src={Cars}
				alt="Cars image"
				height={350}
				width={350}
				style={iconStyle}
			></img>
			<TextBreak />
			<h1>ToDo: contact address/info. All Rights reserved. 2025.</h1>
		</div>
	);
};

export default Contact;

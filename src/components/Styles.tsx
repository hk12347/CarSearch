import styled from "styled-components";

export const LogoLabel = styled.div`
	color: #66ffff;
	font-size: large;
	position: absolute;
	top: 1.3rem;
	left: 4%;
`;

export const MainDiv = styled.div`
	background-color: #3179ba;
`;

export const ButtonLink = styled.a`
	display: inline-flex;
	align-items: center;
	padding: 0.5rem 0.8rem;
	margin-bottom: 0.75rem;
	margin-right: 0.25rem;
	font-size: 1rem;
	font-weight: 600;
	color: white;
	text-decoration: none;
	background-color: #01767e;
	border: 1px solid transparent;
	border-radius: 0.375rem;
	cursor: pointer;
	user-select: none;

	&:hover {
		border-color: gray;
		color: white;
		text-decoration: underline;
	}

	&:focus-within {
		background-color: #1d4ed8;
		border-color: #1d4ed8;
	}
`;

export const PopupButtonWrapper = styled.div`
	position: relative;
	padding: 1rem;
`;

export const ModalWrapper = styled.div`
	position: fixed;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 700px;
	height: 900px;
	background-color: white;
	z-index: 1000;
	border: 1px solid #ccc;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
`;

export const CloseButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	padding: 10px;
	background-color: red;
	color: white;
	border: none;
	cursor: pointer;
	font-size: 16px;
`;

export const TextBoxContainer = styled.div`
	width: 95%; /* Width of the parent div */
	height: 40px !important; /* Height of the parent div */
	// background-color: #f0f0f0; /* Light gray background for the parent */
	display: flex; /* Use flexbox to center the child */
	justify-content: center; /* Center horizontally */
	align-items: center; /* Center vertically */
	position: relative; /* Positioning context for the child */
	margin: 20px auto; /* Center the parent div on the page */
	right: 11px;
`;

// Popup remove icon
interface RemoveIconProps {
	$top?: string;
	$right?: string;
}

export const RemoveIcon = styled.div<RemoveIconProps>`
	color: #01767e;
	top: ${(props) =>
		props.$top || "-0.3em"}; /* Default to -0.3em if not provided */
	right: ${(props) =>
		props.$right || "-0.5em"}; /* Default to -0.5em if not provided */
	font-size: 27px;
	width: 27px;
	height: 26px;
	border-radius: 12px;
	text-align: center;
	z-index: 1;
	cursor: pointer;
	position: absolute;
`;

export const BoldText = styled.div`
	font-weight: bold;
	font-family: inherit;
	color: inherit;
	// word-spacing: 10px;
	padding-left: 5px; // add space front of the text
	padding-right: 5px; // add space front of the text
`;

export const BoldTextSpacer = styled.div`
	font-weight: bold;
	white-space: nowrap;
	letter-spacing: 0.3px;
	padding-right: 5px;
`;

export const ButtonSearchCars = styled.div`
	margin-top: 0px;
	// left:50px;
	top: -10px;
	left: 27%;
`;

export const CarCardContainer = styled.div`
	display: grid;
	justify-content: center;
	margin-top: 0px;
`;

export const CarGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: 1fr;
	gap: 25px; /* Equivalent to Tailwind's gap-2 */

	/* Mobile responsiveness */
	@media (max-width: 1024px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 480px) {
		grid-template-columns: 1fr;
	}
	margin: -65px;
`;

export const CarCard = styled.div`
	background-color: #f1f5f9; /* Equivalent to bg-slate-100 */
	border-radius: 12px; /* Rounded corners */
	color: #4b5563; /* Equivalent to text-gray-700 */
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Shadow equivalent */
	display: flex;
	flex-direction: column;
	background-clip: border-box;
	height: 100%; /* Ensure cards take up the full height of their grid area */
	width: 100%;

	/* Ensure cards maintain consistent size on mobile */
	@media (max-width: 480px) {
		height: auto;
	}
`;

export const CarImage = styled.img`
	height: 225px;
	border-radius: 8px; /* Rounded corners */
`;

export const CarInfo = styled.div`
	background-color: #f1f5f9; /* Equivalent to bg-slate-100 */
	padding: 12px;
	border-radius: 4px;
	height: 350px;
`;

export const CarName = styled.h5`
	font-size: 1.125rem; /* Equivalent to text-lg */
	font-weight: 600; /* Equivalent to font-semibold */
`;

export const CarPrice = styled.p`
	font-weight: 700; /* Equivalent to font-bold */
	margin-bottom: 6px;
`;

export const CarDetails = styled.p`
	color: #4b5563; /* Equivalent to text-gray-700 */
	font-size: 0.875rem; /* Equivalent to text-sm */
	margin-bottom: 6px;
`;

export const CarSpecs = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CarSpec = styled.div`
	display: flex;
	justify-content: space-between;
	color: #4b5563; /* Equivalent to text-gray-700 */
	margin-bottom: 6px;
`;

export const CarSpecLabel = styled.span`
	font-weight: 600; /* Equivalent to font-semibold */
`;

export const CarSpecValue = styled.span`
	font-weight: 400;
`;

export const Spacer = styled.div`
	width: 32px; /* Adjust the width as needed */
	display: inline-block; /* Ensures it behaves like a space */
`;

export const ResultCountText = styled.div`
	display: inline-flex;
	alignitems: center;
	padding: 0.5rem;
	margin-bottom: 0.75rem;
	margin-right: 0.25rem;
	font-size: 1rem;
	font-weight: 600;
	color: #01767e;
	text-decoration: none;
	user-select: none;
	position: relative;
	// left: '48.5%'
	right: 70px;
	float: right;
	top: -68px;
`;

export const TimeStampText = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 0.5rem;
	font-size: 1rem;
	font-weight: 600;
	text-decoration: none;
	user-select: none;
	position: relative;
	float: right;
	top: 20px;
`;

export const FooterText = styled.div`
  display: flex
  align-items: center;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  user-select: none;
  position: relative;
  right: 44%;
  float: right;
  top: 20px;
  margin-top:40px;
  padding-bottom: 72px;
  `;

export const SearchResultContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 0px;
	background-color: #f3feff;
	max-width: 100%;
`;

export const SearchHeader = styled.h2`
	font-size: 18px;
	color: #333;
	font-weight: bold;
	display: inline-block;
	color: #01767e;

	left: 10%;
	position: relative;
	width: 200px;
`;

export const SearchLabel = styled.span`
	margin-top: 0px;
	font-weight: bold;
	color: #555;
	margin-right: 5px;
	display: inline-block;
	// padding-left: 70px;
	float: left;
	padding-right: 10px;
	padding-left: 10px;
`;

export const SearchResultText = styled.div`
	float: left;
	display: inline-block;
	background-color: ##d0e2f9;
	color: black;
	padding: 1px 2px;
	border-radius: 2px;
	margin-right: 2px;
	margin-left: 10px;
`;

export const SearchTextBold = styled.strong`
	font-weight: bold;
	color: #000;
	display: inline-block;
`;

export const SearchTerms = styled.div`
	position: absolute;
	top: 100px;
	left: 20%;
	color: #000000;
	font-size: 15px;
	font-weight: bold;
`;

export const SpecsText = styled.div`
	background-color: #d0e2f9;
	border-radius: 4px;
	color: #5a6673;
	font-size: 13px;
	font-weight: 700;
	font-family: "Noto Sans", sans-serif;
	white-space: nowrap;
`;

export const TextBreak = styled.div`
	margin-bottom: 4rem;
`;

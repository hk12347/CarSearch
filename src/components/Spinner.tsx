import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
	return (
		<span className="spinner-container" id="spinner">
			<FontAwesomeIcon
				icon={faSpinner}
				spin
				title="Loading Data"
				className="spinner_icon"
			/>
		</span>
	);
};

export default Spinner;

import { Link } from "react-router-dom";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { LogoLabel } from "./Styles";
import Swal from "sweetalert2";
import "../styles/Alert.css";

// import { useAuthContext } from "../components/authentication/misc/useAuthContext";

library.add(fas);

const Navbar = () => {
	const linkStyle = {
		color: "white",
		textDecoration: "none",
		fontSize: "16px",
		padding: "5px",
	};

	const iconStyle = {
		color: "white",
		fontSize: "1.2rem",
		marginLeft: "1rem",
		marginTop: "10px",
		cursor: "pointer",
	};

	// const { handleLogout } = useAuthContext();

	function showMessagebox(): void {
		Swal.fire({
			title: "Do you want to logout?",
			showDenyButton: false,
			showCancelButton: true,
			confirmButtonText: "Yes",
			width: "300px",
			heightAuto: false,
			customClass: {
				confirmButton: "confirm-button-class",
				title: "title-class",
				icon: "icon-class",
			},
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("user logout!", "", "success");
				// handleLogout();
			} else if (result.isDenied) {
				// ToDo.
			}
		});
	}

	return (
		<nav className="navbar">
			<LogoLabel>
				<Link to="/" style={linkStyle}>
					<FontAwesomeIcon icon={["fas", "car"]} title="Home" />
				</Link>
				&nbsp;&nbsp;&nbsp;&nbsp;Car Search Beta
			</LogoLabel>
			<div className="navbar-content">
				<Link to="/" style={linkStyle}>
					Home
				</Link>
				<Link to="/About" style={linkStyle}>
					About
				</Link>
				<Link to="/Contact" style={linkStyle}>
					Contact
				</Link>
				<FontAwesomeIcon
					icon={["fas", "sign-out-alt"]}
					onClick={(e) => {
						e.preventDefault();
						showMessagebox();
					}}
					style={iconStyle}
					title="Logout"
				/>
			</div>
		</nav>
	);
};

export default Navbar;

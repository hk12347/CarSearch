import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";

const MyRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="About" element={<About />} />
			<Route path="Contact" element={<Contact />} />
		</Routes>
	);
};

export default MyRoutes;

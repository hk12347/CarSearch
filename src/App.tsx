import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useAuthContext } from "./components/authentication/misc/useAuthContext";
import MainApp from "./mainApp";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<MainApp />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

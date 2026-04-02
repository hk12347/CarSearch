import { useEffect } from "react";
import "./CubeAnimation.js";

const colors = {
	backgroundColor: "#3179ba",
};

const CubeComponent = () => {
	useEffect(() => {
		const script = document.createElement("script");

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div style={colors}>
			<style>
				{`
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #3179ba !important;
                    }
                    #screen {
                        background: #3179ba;
                        position: relative;
                        display: block;
                        margin: 100px auto;
                    }
                `}
			</style>
			<svg id="screen" height="480" width="816"></svg>
		</div>
	);
};

export default CubeComponent;

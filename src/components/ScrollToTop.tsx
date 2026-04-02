import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface ScrollToTopProps {
	scrollerRef: React.RefObject<HTMLDivElement>;
}

const ScrollToTop = ({ scrollerRef }: ScrollToTopProps) => {
	const [showArrow, setShowArrow] = useState(false);

	const handleScroll = () => {
		if (scrollerRef.current) {
			const scrollTop = scrollerRef.current.scrollTop;
			if (scrollTop > 600) {
				setShowArrow(true);
			} else {
				setShowArrow(false);
			}
		}
	};

	useEffect(() => {
		scrollerRef.current?.addEventListener("scroll", handleScroll);
		return () => {
			scrollerRef.current?.removeEventListener("scroll", handleScroll);
		};
	}, [scrollerRef]);

	const handleClick = () => {
		if (scrollerRef.current) {
			scrollerRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return showArrow ? (
		<div
			style={{
				position: "fixed",
				bottom: "20px",
				right: "40px",
				fontWeight: "bold",
				fontSize: "30px",
				cursor: "pointer",
			}}
			onClick={handleClick}
		>
			<FontAwesomeIcon icon={faArrowUp} title="Scroll to Top" />
		</div>
	) : null;
};

export default ScrollToTop;

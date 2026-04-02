import { useEffect, useRef } from "react";

const ScrollToSelectedListItem = ({
	isChosen,
	children,
}: {
	isChosen: boolean;
	children: React.ReactNode;
}) => {
	const listItemRef = useRef<HTMLSpanElement>(null);
	useEffect(() => {
		if (isChosen && listItemRef.current) {
			listItemRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [isChosen]);
	return <span ref={listItemRef}>{children}</span>;
};

export default ScrollToSelectedListItem;

import React, { useEffect, useState } from "react";
import { SearchParams } from "../models/SearchParams";
import {
	ButtonLink,
	PopupButtonWrapper,
	ModalWrapper,
	CloseButton,
} from "./Styles";

interface ButtonProps {
	url: string;
	buttonText: string;
	isPopUp: boolean;
	onClick?: () => void;
	type: "button" | "submit";
	style?: React.CSSProperties; // Optional style property
	searchParams?: SearchParams; // Search parameters back to popup
}

const overlayStyle: React.CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 1000, // keeps overflay over other pages/items
};

const LinkButton = ({
	url,
	buttonText,
	isPopUp,
	onClick,
	type,
	style,
}: ButtonProps) => {
	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		if (isPopUp) {
			e.preventDefault(); // Prevent default action if opening a modal
			openModal();
		}
		if (onClick) {
			e.preventDefault(); // Prevent default action if opening a modal
			onClick(); // Custom click handler (if provided)
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isModalOpen) {
				const modalWrapper = document.querySelector(".modal-wrapper");
				if (
					modalWrapper &&
					!modalWrapper.contains(event.target as Node)
				) {
					closeModal();
				}
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isModalOpen]);

	return (
		<PopupButtonWrapper>
			{type === "submit" ? (
				<ButtonLink type="submit" onClick={handleClick} style={style}>
					{buttonText}
				</ButtonLink>
			) : (
				<ButtonLink
					href={isPopUp ? "#" : url}
					target={isPopUp ? "_blank" : "_self"}
					onClick={handleClick}
					style={style}
				>
					{buttonText}
				</ButtonLink>
			)}

			{/* Modal for the iframe */}
			{isModalOpen && (
				<div style={overlayStyle}>
					<ModalWrapper className="modal-wrapper">
						<CloseButton onClick={closeModal}>Close</CloseButton>
						<iframe
							src={url}
							style={{
								width: "100%",
								height: "100%",
								border: "none",
							}}
							title="Popup Content"
						/>
					</ModalWrapper>
				</div>
			)}
		</PopupButtonWrapper>
	);
};

export default LinkButton;

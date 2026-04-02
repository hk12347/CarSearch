// Custom textfield
// Based on: https://brettfisher.dev/posts/custom-text-field (2025/03)

import React from "react";

type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;
type KeyboardEvent = React.KeyboardEvent<InputElement>;

interface TextFieldProps {
	//icon: React.ComponentType;
	value: string;
	onChange: (val: string) => void;
	placeholder?: string;
	autoFocus?: boolean;
	name?: string;
	type?: "email" | "password" | "text";
	textarea?: boolean;
	onKeyDown?: (e: KeyboardEvent) => void;
	onKeyPress?: (e: KeyboardEvent) => void;
	disabled?: boolean;
}

const TextField = React.forwardRef<InputElement, TextFieldProps>(
	(
		{
			onChange,
			textarea = false,
			onKeyDown,
			onKeyPress,
			disabled,
			...rest
		},
		ref
	) => {
		const InputElement = textarea ? "textarea" : "input";
		return (
			<InputElement
				ref={ref as any}
				className={
					`rounded-md w-full border border-gray-400 p-3 mb-5 ${
						textarea ? "h-32" : ""
					} ${disabled ? "opacity-50 cursor-not-allowed" : ""}` // Add disabled styles
				}
				maxLength={50}
				disabled={disabled} // Pass the disabled prop to the input element
				onChange={({ target: { value } }: InputChangeEvent) =>
					onChange(value)
				}
				onKeyDown={onKeyDown} // Pass the onKeyDown handler to the input element
				onKeyPress={onKeyPress} // Pass the onKeyPress handler to the input element
				{...rest}
			/>
		);
	}
);

export default TextField;

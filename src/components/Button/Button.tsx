import React, { type ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	type?: "button" | "submit" | "reset";
}

export default function Button({ type = "button", ...props }: ButtonProps) {
	return <button type={type}>text</button>;
}

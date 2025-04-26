import { useState } from "react";

interface ButtonProps {
	className?: string;
	callback?: () => void;
}

export function BurgerButton({ className = "", callback }: ButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen((prev) => !prev);
		if (callback) callback();
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-pressed={isOpen}
			className={`2md:hidden flex flex-col justify-center items-center w-12 h-12 gap-1 mt-1 rounded hover:cursor-pointer ${className}`}
		>
			<span className="sr-only">Menu</span>
			<div
				className={`h-1 w-6 bg-white transition-transform ${
					isOpen ? "rotate-45 translate-y-2" : ""
				}`}
			/>
			<div
				className={`h-1 w-6 bg-white transition-opacity ${
					isOpen ? "opacity-0" : ""
				}`}
			/>
			<div
				className={`h-1 w-6 bg-white transition-transform ${
					isOpen ? "-rotate-45 -translate-y-2" : ""
				}`}
			/>
		</button>
	);
}

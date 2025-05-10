import type { ComponentProps } from "react";
import { cn } from "../utils/cn";
import { useSidebarStore } from "../utils/store";
interface ButtonProps extends ComponentProps<"button"> {
	className?: string;
	isPastHero?: boolean;
}

export function BurgerButton({
	className = "",
	isPastHero = false,
	...props
}: ButtonProps) {
	const isOpen = useSidebarStore((state) => state.isOpen);
	const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

	return (
		<button
			type="button"
			onClick={toggleSidebar}
			aria-pressed={isOpen}
			className={`xl:hidden flex flex-col justify-center items-center w-12 h-12 gap-1 mt-1 rounded hover:cursor-pointer transition-all duration-150 ${className}`}
			{...props}
		>
			<span className="sr-only">Menu</span>
			<div
				className={cn(
					"h-1 w-6 bg-white transition-transform",
					isOpen ? "rotate-45 translate-y-2" : "",
					isPastHero ? "!bg-gray-800" : "",
					isPastHero && isOpen ? "!bg-white" : "",
				)}
			/>
			<div
				className={cn(
					"h-1 w-6 bg-white transition-opacity",
					isOpen ? "opacity-0" : "",
					isPastHero ? "!bg-gray-800" : "",
					isPastHero && isOpen ? "!bg-white" : "",
				)}
			/>
			<div
				className={cn(
					"h-1 w-6 bg-white transition-transform",
					isOpen ? "-rotate-45 -translate-y-2" : "",
					isPastHero ? "!bg-gray-800" : "",
					isPastHero && isOpen ? "!bg-white" : "",
				)}
			/>
		</button>
	);
}

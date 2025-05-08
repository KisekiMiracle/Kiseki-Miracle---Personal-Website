import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	label: string;
	leadingIcon?: ReactNode;
	trailingIcon?: ReactElement;
	variant?: "primary" | "secondary" | "sidenav" | "iconOnly";
}

export function Button({
	label,
	leadingIcon,
	trailingIcon,
	variant = "primary",
	className,
	...props
}: ButtonProps) {
	return (
		<button {...props} className={cn(buttonvariants({ variant }), className)}>
			<div className="flex items-center gap-2">
				{leadingIcon && (
					<span className="flex items-center">{leadingIcon}</span>
				)}
				<span>{label}</span>
			</div>
			{trailingIcon}
		</button>
	);
}

const buttonvariants = cva(
	"flex h-fit items-center py-2 px-4 rounded-md transition-colors duration-150 hover:cursor-pointer",
	{
		variants: {
			variant: {
				primary: "bg-pink-600 text-white hover:bg-pink-500",
				secondary: "border hover:bg-gray-100 hover:text-slate-600",
				iconOnly:
					" hover:text-white self-center text-2xl font-bold [&>div>span>span]:transition-all [&>div>span>span]:duration-150 hover:[&>div>span>span]:scale-125",
				sidenav: cn(
					"font-semibold hover:bg-gray-100 hover:text-pink-600",
					"data-[state=open]:bg-pink-600 data-[state=open]:text-white",
				),
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

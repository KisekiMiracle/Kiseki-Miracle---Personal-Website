import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils/cn";

interface props extends ComponentPropsWithoutRef<"div"> {
	title: string;
	description: string;
	words: number;
	minutes: number;
	date: string;
	category: string;
	image?: string;
	variant?: "primary";
	href?: string;
	imageAlign?: string;
}

export function BlogPostCard({
	className,
	variant = "primary",
	title,
	description,
	words,
	minutes,
	date,
	category,
	image,
	href,
	imageAlign,
	...props
}: props) {
	return (
		<div
			className={cn(horizontalCardVariants({ variant }), className)}
			{...props}
		>
			<div
				className={`flex flex-col gap-4 py-2 px-6 2md:p-6 w-full h-full justify-between ${image ? "2md:max-w-6/12" : "2md:max-w-full"}`}
			>
				<h3 className="text-3xl font-bold border-l-5 border-indigo-600 pl-2 flex items-center gap-2 hover:text-indigo-500 hover:cursor-pointer transition-colors duration-150">
					{title}
					<span className="icon-[mdi--chevron-right] text-4xl text-indigo-600" />
				</h3>
				<div className="flex items-center gap-4 text-xl flex-wrap">
					<MetaItem icon="icon-[mdi--calendar-outline]" text={date} />
					<MetaItem icon="icon-[mdi--calendar-outline]" text={category} />
				</div>
				<p className="text-lg ">{description}</p>
				<p className="text-sm text-neutral-400">
					{words} Words | {minutes} Minutes
				</p>
				<MetaItem
					icon="icon-[mdi--calendar-outline]"
					text={date}
					moreThanText={true}
				>
					<>
						<div className="flex items-center gap-1">
							<span className="icon-[mdi--calendar-outline] text-neutral-500" />
							<p className="text-sm text-neutral-500">{date}</p>
						</div>
						<span className="mx-2 text-neutral-400">/</span>
						<div className="flex items-center gap-1">
							<span className="icon-[mdi--calendar-outline] text-neutral-500" />
							<p className="text-sm text-neutral-500">{date}</p>
						</div>
						<span className="mx-2 text-neutral-400">/</span>
						<div className="flex items-center gap-1">
							<span className="icon-[mdi--calendar-outline] text-neutral-500" />
							<p className="text-sm text-neutral-500">{date}</p>
						</div>
					</>
				</MetaItem>
			</div>
			{image ? (
				<div className="relative w-full h-64 2md:h-72 2md:max-h-72 hover:cursor-pointer hover:[&>div]:w-full transition-all duration-150 overflow-hidden 2md:[clip-path:polygon(0%_0%,100%_0%,100%_100%,10%_100%)]">
					<div className="absolute bg-neutral-900/70 w-0 h-full z-10 transition-all duration-250 ease-in-out rounded-r-xl flex items-center justify-center">
						<span className="icon-[mdi--chevron-right] text-white text-8xl" />
					</div>
					<img
						src={image}
						alt="Placeholder"
						className={cn(
							"w-full h-full object-cover",
							imageAlign ? imageAlign : "object-bottom",
						)}
					/>
				</div>
			) : (
				<div className="bg-indigo-500 text-white hover:cursor-pointer hover:bg-indigo-600 transition-colors duration-150 h-full items-center justify-center hidden 2md:flex 2md:max-w-1/5">
					<a
						href={href}
						aria-label="Read More"
						className="icon-[mdi--chevron-right] text-white text-8xl p-6 h-full"
					>
						<span className="sr-only">Read More</span>
					</a>
				</div>
			)}
		</div>
	);
}

function MetaItem({
	icon,
	text,
	moreThanText = false,
	children,
}: {
	icon: string;
	text: string;
	moreThanText?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<div className="flex items-center gap-1">
			<span className={cn(!moreThanText && icon, "text-indigo-400")} />

			{moreThanText ? (
				<>{children}</>
			) : (
				<p className="text-sm text-neutral-500">{text}</p>
			)}
		</div>
	);
}

const horizontalCardVariants = cva(
	"flex flex-col-reverse 2md:flex-row gap-4 rounded-xl justify-between items-center overflow-hidden",
	{
		variants: {
			variant: {
				primary: "bg-white text-neutral-700 shadow-md ",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

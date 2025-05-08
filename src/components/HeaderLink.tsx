import type { HTMLAttributes } from "react";
import { useEffect, useState } from "react";

interface HeaderLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	href: string;
	className?: string;
	scrolled?: boolean;
}

export const HeaderLink = ({
	href,
	className,
	scrolled,
	children,
	...props
}: HeaderLinkProps) => {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const currentPath = window.location.pathname.replace(
			import.meta.env.BASE_URL,
			"",
		);
		const currentSubpath = currentPath.match(/[^\/]+/g)?.[0] || "";
		setIsActive(href === currentPath || href === `/${currentSubpath}`);
	}, [href]);

	return (
		<a
			href={href}
			className={[
				// Base Styles
				"relative inline-flex items-center gap-1.5 py-2 no-underline",

				// Hover Effect (expands from center)
				"after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[2px]",
				"after:bg-white after:-translate-x-1/2 after:transition-all after:duration-200 after:w-0",
				"hover:after:w-full",

				// Active State (permanent border)
				isActive ? "font-bold after:!w-full" : "text-white hover:text-white",
				scrolled ? "after:!bg-gray-800 after:hover:!text-gray-800" : "",
				className,
			].join(" ")}
			{...props}
		>
			{children}
		</a>
	);
};

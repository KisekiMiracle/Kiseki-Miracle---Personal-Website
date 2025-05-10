import { type RefObject, useEffect, useRef, useState } from "react";
import { SITE_TITLE } from "../consts";
import { HeaderLink } from "./HeaderLink";
import { BurgerButton, Button } from "./index";
import "iconify-icon";
import { InFocusGuard } from "react-focus-on";
import { cn } from "./utils/cn";
import { useSidebarStore } from "./utils/store";

export function Header() {
	const isOpen = useSidebarStore((state) => state.isOpen);
	const [isPastHero, setIsPastHero] = useState(false);
	const setFocusRef = useSidebarStore((state) => state.setFocusRef);
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		setFocusRef(ref as RefObject<HTMLElement>);
		return () => setFocusRef(null);
	}, [setFocusRef]);

	useEffect(() => {
		const heroSection = document.querySelector("section.bg-transparent");
		if (!heroSection) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.intersectionRatio > 0) setIsPastHero(!entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.25,
			},
		);

		observer.observe(heroSection);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<>
			<style>
				{`
                    @keyframes rainbow {
                        0% {
                        color: oklch(63.7% 0.237 25.331);
                        }
                        16.66% {
                        color: oklch(76.9% 0.188 70.08);
                        }
                        33.33% {
                        color: oklch(76.8% 0.233 130.85);
                        }
                        50% {
                        color: oklch(72.3% 0.219 149.579);
                        }
                        66.66% {
                        color: oklch(62.3% 0.214 259.815);
                        }
                        83.33% {
                        color: oklch(62.7% 0.265 303.9);
                        }
                        100% {
                        color: oklch(64.5% 0.246 16.439);
                        }
                    }

                    .icon-\\[mdi--octahedron\\] {
                        animation: rainbow 6s linear infinite;
                    }
                `}
			</style>
			<header
				ref={ref}
				className={cn(
					"flex items-center justify-center fixed top-0 left-1/2 -translate-x-1/2 w-full isolate z-10",
					isPastHero && !isOpen
						? "bg-linear-65 from-indigo-200/80 via-green-50/80 to-pink-200/80 backdrop-blur-sm shadow-lg shadow-zinc-200"
						: "",
				)}
			>
				<nav
					className={cn(
						"px-8 py-3 flex items-center justify-between max-w-7xl text-white grow transition-all duration-150",
						isPastHero ? " !text-gray-800 pt-1 pb-2" : "",
					)}
				>
					<div className="flex items-center gap-8 text-md">
						<InFocusGuard>
							<BurgerButton isPastHero={isPastHero} />
						</InFocusGuard>
						<a
							href="/"
							className={cn(
								"hidden xs:inline-flex items-center gap-2 self-center mt-1 font-bold",
								isPastHero ? "text-gray-800" : "",
								!isOpen ? "visible" : "invisible",
							)}
						>
							<span className="icon-[mdi--octahedron] text-2xl" />
							{SITE_TITLE}
						</a>
						<div
							className={cn(
								"hidden gap-6 sm:flex",
								!isOpen ? "visible" : "invisible",
							)}
						>
							<HeaderLink href="/" scrolled={isPastHero}>
								<span className="icon-[fa-solid--home]" />
								Home
							</HeaderLink>
							<HeaderLink href="/blog" scrolled={isPastHero}>
								<span className="icon-[mdi--blog-outline]" />
								Blog
							</HeaderLink>
							<HeaderLink href="/about" scrolled={isPastHero}>
								<span className="icon-[ix--about]" />
								About
							</HeaderLink>
						</div>
					</div>
					<div
						className={cn(
							"flex items-center gap-2",
							isPastHero ? "mt-1.5" : "",
							isOpen ? "hidden" : "",
						)}
					>
						<a href="/">
							<Button
								label=""
								variant="iconOnly"
								leadingIcon={
									<span
										className={cn(
											"icon-[mdi--search]",
											isPastHero ? "text-gray-800" : "",
										)}
									/>
								}
							/>
						</a>
						<a href="/tos/commissions" className="hidden 2md:block">
							<Button
								label="Commission Me!"
								variant="secondary"
								className={`self-center p-2 text-md font-bold hover:text-slate-600 hover:[&>div>span>span]:text-slate-600 hover:[&>div>span>span]:scale-125 ${isPastHero ? "hover:text-white hover:bg-gray-800 hover:[&>div>span>span]:text-white hover:border-gray-800" : ""}`}
								leadingIcon={
									<span
										className={cn(
											"icon-[mdi--art] text-2xl transition-colors duration-150",
											isPastHero ? "text-gray-800" : "",
										)}
									/>
								}
							/>
						</a>
					</div>
				</nav>
			</header>
		</>
	);
}

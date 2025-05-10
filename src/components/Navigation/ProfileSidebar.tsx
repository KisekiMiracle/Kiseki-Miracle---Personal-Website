import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { FocusOn } from "react-focus-on";
import { cn } from "../utils/cn";
import { useSidebarStore } from "../utils/store";

interface props extends ComponentPropsWithoutRef<"div"> {
	className?: string;
}

export function ProfileSidebar({ className, ...props }: props) {
	const isOpen = useSidebarStore((state) => state.isOpen);
	const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
	const focusRef = useSidebarStore((state) => state.focusRef);

	return (
		<>
			<FocusOn
				onClickOutside={() => {
					toggleSidebar();
				}}
				enabled={isOpen}
				shards={focusRef ? [focusRef] : undefined}
			>
				<aside
					className={cn(
						"w-0 invisible z-10 h-fit xl:visible xl:flex flex-col xl:min-w-56 xl:gap-4 items-center bg-white rounded-xl xl:p-4 xl:shadow-sm",
						isOpen
							? "visible fixed top-0 right-0 gap-4 p-4 !flex !min-w-64 !min-h-screen isolate rounded-r-none"
							: "",
						"isolate sticky top-24",
					)}
					{...props}
				>
					<img
						alt=""
						src="https://bucket.kiseki-miracle.dev/pfp.png"
						className="w-24 h-24 rounded-full"
					/>
					<h2 className="text-3xl font-bold text-gray-800">Kiseki 奇跡</h2>
					<p className="text-md text-gray-500">奇跡のプロフィールです。</p>
					<div className="flex gap-2">
						<SocialIcon
							href="https://x.com/_kiseki_miracle"
							iconClass="icon-[fa6-brands--square-x-twitter]"
							label="X"
						/>
						<SocialIcon
							href="https://github.com/KisekiMiracle"
							iconClass="icon-[fa-brands--github]"
							label="GitHub"
						/>
						<SocialIcon
							href="https://www.pixiv.net/en/users/110005305"
							iconClass="icon-[fa6-brands--pixiv]"
							label="Pixiv"
						/>
					</div>
					<div className="grid grid-flow-col gap-2 ">
						<CardItem count={1} label="Unique Views" />
						<div className="h-full border-r-2 border-r-neutral-300" />
						<CardItem count={1} label="Articles" />
						<div className="h-full border-r-2 border-r-neutral-300" />
						<CardItem count={1} label="Articles" />
					</div>
				</aside>
			</FocusOn>
		</>
	);
}

function SocialIcon({
	href,
	iconClass,
	label,
}: { href: string; iconClass: string; label: string }) {
	return (
		<motion.a
			layout
			href={href}
			target="_blank"
			rel="noreferrer"
			whileHover={{ scale: 1.25 }}
			whileTap={{ scale: 0.9 }}
		>
			<span className="sr-only">{label}</span>
			<span className={cn(iconClass, "text-2xl")} />
		</motion.a>
	);
}

function CardItem({
	count,
	label,
}: {
	count: number;
	label: string;
}) {
	return (
		<p className="inline-flex flex-col items-center justify-center text-center">
			<span>{count}</span>
			<small>{label}</small>
		</p>
	);
}

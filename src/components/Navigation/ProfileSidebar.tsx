import type { ComponentPropsWithoutRef } from "react";
import { FocusOn } from "react-focus-on";
import { useSidebarStore } from "../utils/store";

interface props extends ComponentPropsWithoutRef<"div"> {
	className?: string;
}

export default function ProfileSidebar({ className, ...props }: props) {
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
					className={`w-0 z-10 h-fit xl:flex flex-col xl:min-w-56 xl:gap-4 items-center bg-white rounded-xl xl:p-4 xl:shadow-sm ${
						isOpen
							? "fixed top-0 right-0 gap-4 p-4 !flex !min-w-64 !min-h-screen isolate rounded-r-none"
							: ""
					}`}
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
						<a href="https://x.com/_kiseki_miracle">
							<span className="sr-only">X</span>
							<span className="icon-[fa6-brands--square-x-twitter] text-2xl" />
						</a>
						<a href="https://github.com/KisekiMiracle">
							<span className="sr-only">GitHub</span>
							<span className="icon-[fa-brands--github] text-2xl" />
						</a>
						<a href="https://www.pixiv.net/en/users/110005305">
							<span className="sr-only">Pixiv</span>
							<span className="icon-[fa6-brands--pixiv] text-2xl" />
						</a>
					</div>
				</aside>
			</FocusOn>
		</>
	);
}

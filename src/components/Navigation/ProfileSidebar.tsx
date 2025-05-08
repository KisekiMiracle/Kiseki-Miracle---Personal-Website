import { FocusOn } from "react-focus-on";
import { useSidebarStore } from "../utils/store";

export default function ProfileSidebar() {
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
					className={`hidden xl:flex flex-col min-w-56 h-fit gap-4 items-center bg-white rounded-xl p-4 shadow-xs ${
						isOpen
							? "fixed top-0 right-0 z-10 !flex !min-w-64 !min-h-screen isolate rounded-r-none"
							: ""
					}`}
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
			<div
				className={`${
					isOpen
						? "fixed top-0 left-0 z-1 h-screen w-screen bg-black/50 backdrop-blur-sm"
						: "hidden"
				}`}
			/>
		</>
	);
}

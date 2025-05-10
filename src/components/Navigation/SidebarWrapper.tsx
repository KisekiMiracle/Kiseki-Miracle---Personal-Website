import { AnimatePresence, motion } from "framer-motion";
import { useSidebarStore } from "../utils/store";
import { ProfileSidebar } from "./ProfileSidebar";

export default function SidebarWrapper() {
	const isOpen = useSidebarStore((state) => state.isOpen);

	return (
		<>
			<AnimatePresence mode="wait">
				{isOpen ? (
					<motion.div
						initial="closed"
						animate="open"
						transition={{
							duration: 0.4,
							ease: "easeOut",
							type: "tween",
						}}
						variants={{
							closed: {
								x: 200,
								opacity: 0,
								transitionEnd: {
									visibility: "hidden",
								},
							},
							open: {
								x: 0,
								opacity: 1,
								visibility: "visible",
							},
						}}
						className="isolate h-fit items-center bg-white rounded-xl fixed top-0 right-0 z-[100]"
					>
						<ProfileSidebar />
					</motion.div>
				) : (
					<ProfileSidebar />
				)}
			</AnimatePresence>
			<div
				className={`${
					isOpen
						? "fixed top-0 left-0 z-[90] h-screen w-screen bg-black/50 backdrop-blur-sm"
						: "hidden"
				}`}
			/>
		</>
	);
}

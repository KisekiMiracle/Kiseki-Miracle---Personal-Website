"use client";

import {
	ClickScrollPlugin,
	OverlayScrollbars,
	ScrollbarsHidingPlugin,
	SizeObserverPlugin,
} from "overlayscrollbars";
import { useEffect, useRef } from "react";

export function OverlayWrapper({ children }: { children: React.ReactNode }) {
	const containerRef = useRef(null);

	OverlayScrollbars.plugin([
		ScrollbarsHidingPlugin,
		SizeObserverPlugin,
		ClickScrollPlugin,
	]);

	useEffect(() => {
		if (containerRef.current) {
			OverlayScrollbars(containerRef.current, {
				scrollbars: {
					theme: "os-theme-dark",
					autoHide: "move",
					autoHideDelay: 500,
					autoHideSuspend: false,
					clickScroll: true,
				},
			});
		}
	}, []);

	return (
		<div
			ref={containerRef}
			style={{ height: "100vh", overflow: "auto", isolation: "isolate" }}
		>
			{children}
		</div>
	);
}

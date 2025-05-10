"use client";

import { ReactLenis } from "lenis/react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
	return (
		<ReactLenis root>
			<OverlayScrollbarsComponent
				element="body"
				className="bg-gradient-to-b from-slate-900 to-slate-800 text-white"
				options={{
					scrollbars: {
						theme: "os-theme-dark",
						autoHide: "move",
						autoHideDelay: 500,
						autoHideSuspend: false,
						clickScroll: true,
					},
				}}
				defer
				suppressHydrationWarning={true}
			>
				{children}
			</OverlayScrollbarsComponent>
		</ReactLenis>
	);
}

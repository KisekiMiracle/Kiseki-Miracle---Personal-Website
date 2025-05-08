import type { RefObject } from "react";
import { create } from "zustand";

// Burger Button → Profile Sidebar
type SidebarState = {
	isOpen: boolean;
	toggleSidebar: () => void;
	focusRef: RefObject<HTMLElement> | null;
	setFocusRef: (ref: RefObject<HTMLElement> | null) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
	isOpen: false,
	toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
	focusRef: null,
	setFocusRef: (ref) => set({ focusRef: ref }),
}));

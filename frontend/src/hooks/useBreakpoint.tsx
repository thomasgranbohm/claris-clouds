import { useEffect, useState } from "react";

import { Breakpoint } from "types/generics";

const useBreakpoint = (): Breakpoint | null => {
	const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

	useEffect(() => {
		const calculateBreakpoint = () => {
			// TODO: Badly implemented
			// Removes the padding on the edges
			const width = window.innerWidth - 36;

			if (width >= Breakpoint.xl) {
				setBreakpoint(Breakpoint.xl);
			} else if (width >= Breakpoint.lg) {
				setBreakpoint(Breakpoint.lg);
			} else if (width >= Breakpoint.md) {
				setBreakpoint(Breakpoint.md);
			} else if (width >= Breakpoint.sm) {
				setBreakpoint(Breakpoint.sm);
			} else if (width >= Breakpoint.xs) {
				setBreakpoint(Breakpoint.xs);
			} else {
				setBreakpoint(0);
			}
		};

		window.addEventListener("resize", calculateBreakpoint);
		calculateBreakpoint();

		return () => {
			window.removeEventListener("resize", calculateBreakpoint);
		};
	}, []);

	return breakpoint;
};

export default useBreakpoint;

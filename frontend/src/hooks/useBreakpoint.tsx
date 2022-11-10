import { UIEvent, useEffect, useState } from "react";

import { BREAKPOINTS } from "types/generics";

const useBreakpoint = (): BREAKPOINTS | null => {
	const [breakpoint, setBreakpoint] = useState<BREAKPOINTS | null>(null);

	useEffect(() => {
		const calculateBreakpoint = () => {
			const w = window.innerWidth;

			if (window.innerWidth >= BREAKPOINTS.xl) {
				setBreakpoint(BREAKPOINTS.xl);
			} else if (window.innerWidth >= BREAKPOINTS.lg) {
				setBreakpoint(BREAKPOINTS.lg);
			} else if (window.innerWidth >= BREAKPOINTS.md) {
				setBreakpoint(BREAKPOINTS.md);
			} else if (window.innerWidth >= BREAKPOINTS.sm) {
				setBreakpoint(BREAKPOINTS.sm);
			} else {
				setBreakpoint(null);
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

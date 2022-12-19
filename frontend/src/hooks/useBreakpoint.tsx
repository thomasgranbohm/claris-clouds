import { useEffect, useState } from "react";

import { Breakpoint } from "types/generics";

const useBreakpoint = (): Breakpoint | null => {
	const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

	useEffect(() => {
		const calculateBreakpoint = () => {
			if (window.innerWidth >= Breakpoint.xl) {
				setBreakpoint(Breakpoint.xl);
			} else if (window.innerWidth >= Breakpoint.lg) {
				setBreakpoint(Breakpoint.lg);
			} else if (window.innerWidth >= Breakpoint.md) {
				setBreakpoint(Breakpoint.md);
			} else if (window.innerWidth >= Breakpoint.sm) {
				setBreakpoint(Breakpoint.sm);
			} else if (window.innerWidth >= Breakpoint.xs) {
				setBreakpoint(Breakpoint.xs);
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

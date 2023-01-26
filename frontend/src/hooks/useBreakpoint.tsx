import { useEffect, useState } from "react";

import { Breakpoint } from "types/generics";

import getGutter from "utils/getGutter";

const useBreakpoint = (): Breakpoint | null => {
	const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);
	const gutter = getGutter(2);

	useEffect(() => {
		const calculateBreakpoint = () => {
			const width = window.innerWidth - gutter;

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
	}, [gutter]);

	return breakpoint;
};

export default useBreakpoint;

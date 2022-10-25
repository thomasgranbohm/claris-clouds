import { FC } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Column.module.scss";

type ALIGNMENTS = "center" | "end" | "start";
type BREAKPOINTS = "sm" | "md" | "lg" | "xl";
type SIZE_PROPERTY = number | [number, number];

type BreakpointMappings = {
	[breakpoint in BREAKPOINTS]?: SIZE_PROPERTY;
};

interface ColumnProps extends WithChildren, WithClassname, BreakpointMappings {
	align?: ALIGNMENTS;
	justify?: ALIGNMENTS;
}

const Column: FC<ColumnProps> = ({
	align,
	children,
	className,
	justify,
	lg,
	md,
	sm,
	xl,
}) => {
	const getClass = (label: BREAKPOINTS, s?: SIZE_PROPERTY) => {
		if (!s) {
			return null;
		}

		if (Array.isArray(s)) {
			const [size, start] = s;

			return classes[`size--${label}-${size}-${start}`];
		} else {
			return classes[`size--${label}-${s}`];
		}
	};

	return (
		<div
			className={clsx(
				classes["container"],
				getClass("sm", sm),
				getClass("md", md),
				getClass("lg", lg),
				getClass("xl", xl),
				align && classes[`align--${align}`],
				justify && classes[`justify--${justify}`],
				className
			)}
		>
			{children}
		</div>
	);
};

export default Column;

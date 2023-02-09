import { FC } from "react";
import clsx from "clsx";

import { WithChildren } from "types/components";
import { WithClassname } from "types/components";
import { BreakpointNames } from "types/generics";

import classes from "./Grid.module.scss";

type ALIGNMENTS = "center" | "end" | "start";
type GAP_VALUES = "none" | "single" | "double";
type SIZE_PROPERTY = number | [number, number];

type BreakpointMappings = {
	[breakpoint in BreakpointNames]?: SIZE_PROPERTY;
};

interface ColumnProps extends WithChildren, WithClassname, BreakpointMappings {
	align?: ALIGNMENTS;
	justify?: ALIGNMENTS;
}

export const Column: FC<ColumnProps> = ({
	align,
	children,
	className,
	justify,
	...breakpoints
}) => {
	const getClass = (label: BreakpointNames, s?: SIZE_PROPERTY) => {
		if (!s) {
			return null;
		}

		if (Array.isArray(s)) {
			const [size, start] = s;

			return [
				classes[`size--${label}-${size}`],
				classes[`start--${label}-${start}`],
			];
		} else {
			return classes[`size--${label}-${s}`];
		}
	};

	return (
		<div
			className={clsx(
				classes["column"],
				Object.entries(breakpoints).map(([key, value]) =>
					getClass(key as BreakpointNames, value)
				),
				align && classes[`align--${align}`],
				justify && classes[`justify--${justify}`],
				className
			)}
		>
			{children}
		</div>
	);
};

interface RowProps extends WithChildren, WithClassname {
	"column-gap"?: GAP_VALUES;
	gap?: GAP_VALUES;
	"row-gap"?: GAP_VALUES;
}

export const Row: FC<RowProps> = ({
	children,
	className,
	"column-gap": columnGap,
	gap = "single",
	"row-gap": rowGap,
}) => {
	return (
		<div
			className={clsx(
				classes["row"],
				classes[`column-gap--${columnGap || gap}`],
				classes[`row-gap--${rowGap || gap}`],
				className
			)}
		>
			{children}
		</div>
	);
};

export default Row;

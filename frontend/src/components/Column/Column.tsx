import { FC } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";
import { BreakpointNames } from "types/generics";

import classes from "./Column.module.scss";

type ALIGNMENTS = "center" | "end" | "start";
type SIZE_PROPERTY = number | [number, number];

type BreakpointMappings = {
	[breakpoint in BreakpointNames]?: SIZE_PROPERTY;
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
				classes["container"],
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

export default Column;

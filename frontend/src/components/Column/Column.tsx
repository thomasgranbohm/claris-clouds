import { FC } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Column.module.scss";

type BREAKPOINTS = "sm" | "md" | "lg" | "xl";

type SIZE_PROPERTY = number | [number, number];

type ColumnProps = WithChildren &
	WithClassname &
	{
		[breakpoint in BREAKPOINTS]?: SIZE_PROPERTY;
	};

const Column: FC<ColumnProps> = ({ children, className, lg, md, sm, xl }) => {
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
				className
			)}
		>
			{children}
		</div>
	);
};

export default Column;

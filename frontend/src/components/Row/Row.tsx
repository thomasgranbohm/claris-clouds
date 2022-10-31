import { FC } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Row.module.scss";

type GAP_VALUES = "none" | "single" | "double";

interface RowProps extends WithChildren, WithClassname {
	"column-gap"?: GAP_VALUES;
	gap?: GAP_VALUES;
	"row-gap"?: GAP_VALUES;
}

const Row: FC<RowProps> = ({
	children,
	className,
	"column-gap": columnGap,
	gap = "single",
	"row-gap": rowGap,
}) => {
	return (
		<div
			className={clsx(
				classes["container"],
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

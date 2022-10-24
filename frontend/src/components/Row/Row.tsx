import { FC } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Row.module.scss";

interface RowProps extends WithChildren, WithClassname {
	gap?: "none" | "single" | "double";
}

const Row: FC<RowProps> = ({ children, className, gap = "single" }) => {
	return (
		<div
			className={clsx(
				classes["container"],
				classes[`gap--${gap}`],
				className
			)}
		>
			{children}
		</div>
	);
};

export default Row;

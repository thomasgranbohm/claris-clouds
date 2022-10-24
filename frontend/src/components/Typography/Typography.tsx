import { createElement, FC, ReactHTML } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Typography.module.scss";

interface TypographyProps extends WithChildren, WithClassname {
	color?: "foreground" | "background" | "accent";
	type?: Extract<keyof ReactHTML, "span" | "p">;
	weight?: "normal" | "medium" | "semi-bold" | "bold";
}

const Typography: FC<TypographyProps> = ({
	children,
	className,
	color = "foreground",
	type = "p",
	weight = "normal",
}) => {
	return createElement(
		type,
		{
			className: clsx(
				classes["container"],
				color && classes[`color--${color}`],
				weight && classes[`weight--${weight}`],
				className
			),
		},
		children
	);
};

export default Typography;

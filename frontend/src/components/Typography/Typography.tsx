import { createElement, FC, ReactHTML } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";
import { Colors } from "types/generics";

import classes from "./Typography.module.scss";

interface TypographyProps extends WithChildren, WithClassname {
	color?: Colors;
	inline?: true;
	size?: "normal" | "large" | "larger" | "small" | "smaller";
	type?: Extract<keyof ReactHTML, "span" | "p">;
	weight?: "normal" | "medium" | "semi-bold" | "bold";
}

const Typography: FC<TypographyProps> = ({
	children,
	className,
	color = "black",
	inline,
	size = "normal",
	type = "p",
	weight = "normal",
}) => {
	return createElement(
		type,
		{
			className: clsx(
				classes["container"],
				classes[`color--${color}`],
				classes[`size--${size}`],
				classes[`type--${type}`],
				classes[`weight--${weight}`],
				inline && classes["inline"],
				className
			),
		},
		children
	);
};

export default Typography;

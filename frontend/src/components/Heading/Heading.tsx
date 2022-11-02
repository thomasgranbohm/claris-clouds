import { createElement, FC } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";
import { COLORS, HEADINGS } from "types/generics";

import classes from "./Heading.module.scss";

interface HeadingProps extends WithChildren, WithClassname {
	color?: COLORS;
	look?: HEADINGS;
	type: HEADINGS;
}

const Heading: FC<HeadingProps> = ({
	children,
	className,
	color = "foreground",
	look,
	type,
}) => {
	return createElement(
		type,
		{
			className: clsx(
				classes["container"],
				classes[`color--${color}`],
				classes[`look--${look || type}`],
				className
			),
		},
		children
	);
};

export default Heading;

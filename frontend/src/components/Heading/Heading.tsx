import { createElement, FC } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Heading.module.scss";

interface HeadingProps extends WithChildren, WithClassname {
	look?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b";
	type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b";
}

const Heading: FC<HeadingProps> = ({ children, className, look, type }) => {
	return createElement(
		type,
		{
			className: clsx(
				classes["container"],
				classes[`look--${look || type}`],
				className
			),
		},
		children
	);
};

export default Heading;

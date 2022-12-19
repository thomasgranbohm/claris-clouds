import { createElement, FC } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";
import { Colors, Headings } from "types/generics";

import classes from "./Heading.module.scss";

export const PageTitle: FC<Omit<HeadingProps, "type">> = ({
	children,
	className,
	...props
}) => (
	<Heading
		{...props}
		type="h1"
		className={clsx(classes["page-title"], className)}
	>
		{children}
	</Heading>
);

interface HeadingProps extends WithChildren, WithClassname {
	color?: Colors;
	look?: Headings;
	type: Headings;
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

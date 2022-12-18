import { FC, ReactNode } from "react";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";

import classes from "./List.module.scss";

interface ListProps extends WithChildren, WithClassname {
	variant: "ordered" | "unordered";
}

export const ListItem: FC<WithChildren> = ({ children }) => (
	<li className={classes["item"]}>{children}</li>
);

const List: FC<ListProps> = ({ children, className, variant }) => {
	const Element = variant === "ordered" ? "ol" : "ul";

	return (
		<Element className={clsx(classes["container"], className)}>
			{children}
		</Element>
	);
};

export default List;

import { FC } from "react";
import clsx from "clsx";
import NextLink from "next/link";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Link.module.scss";

interface LinkProps extends WithChildren, WithClassname {
	asWrapper?: boolean;
	href: string;
}

const Link: FC<LinkProps> = ({ asWrapper, children, className, href }) => {
	return (
		<NextLink href={href}>
			<a
				className={clsx(
					classes["container"],
					asWrapper && classes["wrapper"],
					className
				)}
			>
				{children}
			</a>
		</NextLink>
	);
};

export default Link;

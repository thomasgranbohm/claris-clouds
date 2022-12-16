import { FC, useRef } from "react";
import { AriaLinkOptions, useLink } from "react-aria";
import clsx from "clsx";
import NextLink from "next/link";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Link.module.scss";

interface LinkProps extends WithChildren, WithClassname, AriaLinkOptions {
	asWrapper?: boolean;
	href: string;
	target?: string;
}

const Link: FC<LinkProps> = ({ asWrapper, className, ...props }) => {
	const ref = useRef<HTMLAnchorElement>(null);
	const { linkProps } = useLink(props, ref);
	const { children, href } = props;

	return (
		<NextLink
			{...props}
			{...linkProps}
			href={href}
			passHref
			className={clsx(
				classes["container"],
				asWrapper && classes["wrapper"],
				className
			)}
		>
			{children}
		</NextLink>
	);
};

export default Link;

import { FC, useRef } from "react";
import { AriaLinkOptions, useLink } from "react-aria";
import clsx from "clsx";
import NextLink from "next/link";

import FocusRing from "components/aria/FocusRing";
import Heading from "components/Heading";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Link.module.scss";

export interface LinkProps
	extends WithChildren,
		WithClassname,
		AriaLinkOptions {
	asWrapper?: boolean;
	href: string;
	target?: string;
}

export const StyledLink: FC<LinkProps> = ({ children, ...props }) => {
	return (
		<Link {...props} asWrapper>
			<div className={classes["box"]}>
				<Heading
					className={classes["title"]}
					color="background"
					type="b"
				>
					{children}
				</Heading>
			</div>
		</Link>
	);
};

const Link: FC<LinkProps> = ({ asWrapper, className, ...props }) => {
	const ref = useRef<HTMLAnchorElement>(null);
	const { linkProps } = useLink(props, ref);
	const { children, href } = props;

	return (
		<FocusRing>
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
		</FocusRing>
	);
};

export default Link;

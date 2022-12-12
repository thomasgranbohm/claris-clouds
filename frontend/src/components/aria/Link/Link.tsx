import { FC, useRef } from "react";
import { AriaLinkOptions, useLink } from "react-aria";
import clsx from "clsx";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Link.module.scss";

interface LinkProps extends WithChildren, WithClassname, AriaLinkOptions {
	href?: string;
	target?: string;
}

const Link: FC<LinkProps> = ({ className, ...props }) => {
	const ref = useRef<HTMLAnchorElement>(null);
	const { linkProps } = useLink(props, ref);
	const { children, href, target } = props;

	return (
		<a
			{...linkProps}
			className={clsx(classes["container"], className)}
			href={href}
			ref={ref}
			target={target}
		>
			{children}
		</a>
	);
};

export default Link;

import { FC } from "react";
import { AriaLinkOptions } from "react-aria";
import clsx from "clsx";
import NextLink from "next/link";

import AriaLink from "components/aria/Link";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Link.module.scss";

interface LinkProps extends WithChildren, WithClassname {
	asWrapper?: boolean;
	href: string;
	target?: string;
}

const Link: FC<LinkProps> = ({
	asWrapper,
	children,
	className,
	href,
	target,
}) => {
	return (
		<NextLink href={href} passHref>
			<AriaLink
				className={clsx(
					classes["container"],
					asWrapper && classes["wrapper"],
					className
				)}
				target={target}
			>
				{children}
			</AriaLink>
		</NextLink>
	);
};

export default Link;

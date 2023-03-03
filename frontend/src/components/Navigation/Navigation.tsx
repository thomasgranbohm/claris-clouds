import { FC } from "react";
import clsx from "clsx";
import { useCartContext } from "contexts/CartContext";
import { useRouter } from "next/router";

import Icon from "components/Icon";
import Link from "components/Link";

import Components from "types/api/components";
import { WithClassname } from "types/components";

import classes from "./Navigation.module.scss";

interface NavigationLinkProps extends Components.Link {
	active?: boolean;
}

const NavigationLink: FC<NavigationLinkProps> = ({ active, label, path }) => {
	return (
		<li className={classes["item"]}>
			<Link
				className={clsx(classes["link"], active && classes["active"])}
				href={path}
			>
				{label}
			</Link>
		</li>
	);
};

interface NavigationSocialProps extends Components.Social {}

const NavigationSocial: FC<NavigationSocialProps> = ({ link, type }) => {
	return (
		<li className={classes["item"]}>
			<Link
				className={classes["social"]}
				href={link}
				target="_blank"
				aria-label={type}
			>
				<Icon
					className={classes["icon"]}
					variant={
						type.toLowerCase() as Lowercase<Components.SocialType>
					}
				/>
			</Link>
		</li>
	);
};

interface NavigationProps extends WithClassname {
	links?: Components.Link[];
	socials?: Components.Social[];
}

const Navigation: FC<NavigationProps> = ({ className, links, socials }) => {
	const router = useRouter();
	const { totalQuantity } = useCartContext();

	return (
		<nav className={clsx(classes["container"], className)}>
			{links && (
				<ul className={classes["links"]}>
					{links.map((props, i) => (
						<NavigationLink
							{...props}
							active={router.pathname === props.path}
							key={i}
						/>
					))}
				</ul>
			)}
			{socials && (
				<ul className={classes["socials"]}>
					{socials.map((props, i) => (
						<NavigationSocial {...props} key={i} />
					))}
				</ul>
			)}
			<Link href="/cart">
				<p>cart {totalQuantity}</p>
			</Link>
		</nav>
	);
};

export default Navigation;

import { FC } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";

import Link from "components/Link";

import { WithClassname } from "types/components";

import classes from "./Navigation.module.scss";

interface StrapiLink {
	label: string;
	path: string;
}

interface NavigationProps extends WithClassname {
	links: Array<StrapiLink>;
}

interface NavigationItemProps extends StrapiLink {
	active?: boolean;
}

const NavigationItem: FC<NavigationItemProps> = ({ active, label, path }) => {
	return (
		<Link
			className={clsx(classes["link"], active && classes["active"])}
			href={path}
		>
			<li className={classes["item"]}>{label}</li>
		</Link>
	);
};

const Navigation: FC<NavigationProps> = ({ className, links }) => {
	const router = useRouter();

	return (
		<ul className={clsx(classes["container"], className)}>
			{links.map((props, i) => (
				<NavigationItem
					{...props}
					active={router.pathname === props.path}
					key={i}
				/>
			))}
		</ul>
	);
};

export default Navigation;

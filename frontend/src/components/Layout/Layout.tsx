import { FC } from "react";

import Link from "components/Link";

import PageInformationSchema from "types/api/page-information";
import { WithChildren } from "types/components";

import classes from "./Layout.module.scss";

export interface LayoutProps extends WithChildren, PageInformationSchema {
	// Remove me
}

const Layout: FC<LayoutProps> = ({ children, favicon, links, logo }) => {
	return (
		<main className={classes["container"]}>
			<header className={classes["header"]}>
				{links.map(({ label, path }, i) => (
					<Link key={i} href={path}>
						{label}
					</Link>
				))}
			</header>
			<article className={classes["content"]}>{children}</article>
			<footer className={classes["footer"]}></footer>
		</main>
	);
};

export default Layout;

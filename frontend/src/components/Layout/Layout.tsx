import { FC } from "react";

import { WithChildren } from "types/components";

import classes from "./Layout.module.scss";

interface LayoutProps extends WithChildren {
	// Remove me
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<main className={classes["container"]}>
			<header className={classes["header"]}></header>
			<article className={classes["content"]}>{children}</article>
			<footer className={classes["footer"]}></footer>
		</main>
	);
};

export default Layout;

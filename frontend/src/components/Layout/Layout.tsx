import { FC } from "react";

import Header from "components/Header";
import Link from "components/Link";

import PageInformationSchema from "types/api/page-information";
import { WithChildren } from "types/components";

import classes from "./Layout.module.scss";

export interface LayoutProps extends WithChildren, PageInformationSchema {
	// Remove me
}

const Layout: FC<LayoutProps> = ({ children, ...headerProps }) => {
	return (
		<main className={classes["container"]}>
			<Header {...headerProps} className={classes["header"]} />
			<article className={classes["content"]}>{children}</article>
			<footer className={classes["footer"]}></footer>
		</main>
	);
};

export default Layout;

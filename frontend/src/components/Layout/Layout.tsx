import { FC } from "react";

import Footer from "components/Footer";
import Header from "components/Header";

import PageInformationSchema from "types/api/page-information";
import { WithChildren } from "types/components";

import classes from "./Layout.module.scss";

export interface LayoutProps extends WithChildren, PageInformationSchema {
	// Remove me
}

const Layout: FC<LayoutProps> = ({ children, links, logo, socials }) => {
	return (
		<main className={classes["container"]}>
			<Header
				className={classes["header"]}
				links={links}
				logo={logo}
				socials={socials}
			/>
			<article className={classes["content"]}>{children}</article>
			<Footer links={links} socials={socials} />
		</main>
	);
};

export default Layout;

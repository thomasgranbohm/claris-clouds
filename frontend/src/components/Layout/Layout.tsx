import { FC } from "react";

import FocusRing from "components/aria/FocusRing";
import Footer from "components/Footer";
import Header from "components/Header";

import PageInformationSchema from "types/api/page-information";
import { WithChildren } from "types/components";

import classes from "./Layout.module.scss";

export interface LayoutProps extends WithChildren, PageInformationSchema {
	// Remove me
}

const Layout: FC<LayoutProps> = ({ children, links, logo, socials }) => {
	// TODO: Skip link does not work correctly on non layout pages

	return (
		<main className={classes["container"]}>
			<FocusRing>
				<a href="#main-content" className="skip-link">
					Skip to main content
				</a>
			</FocusRing>
			<Header
				className={classes["header"]}
				links={links}
				logo={logo}
				socials={socials}
			/>
			<article id="main-content" className={classes["content"]}>
				{children}
			</article>
			<Footer links={links} socials={socials} />
		</main>
	);
};

export default Layout;

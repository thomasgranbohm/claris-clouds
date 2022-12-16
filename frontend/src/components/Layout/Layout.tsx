import { FC } from "react";
import clsx from "clsx";

import Footer from "components/Footer";
import Header from "components/Header";

import PageInformationSchema from "types/api/page-information";
import { WithChildren } from "types/components";

import classes from "./Layout.module.scss";

export interface LayoutProps extends WithChildren, PageInformationSchema {
	conformity?: boolean;
}

const Layout: FC<LayoutProps> = ({
	children,
	conformity = true,
	links,
	logo,
	socials,
}) => {
	return (
		<main
			className={clsx(
				classes["container"],
				!conformity && classes["non-conformity"]
			)}
		>
			<Header
				className={classes["header"]}
				links={links}
				logo={logo}
				socials={socials}
			/>
			<article id="main-content" className={classes["content"]}>
				{children}
			</article>
			<Footer
				className={classes["footer"]}
				links={links}
				socials={socials}
			/>
		</main>
	);
};

export default Layout;

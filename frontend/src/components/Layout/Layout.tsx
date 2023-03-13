import { FC, useEffect, useRef, useState } from "react";
import { FocusScope } from "react-aria";
import clsx from "clsx";

import Campaign from "components/Campaign";
import CookieConsent from "components/CookieConsent";
import Footer from "components/Footer";
import Header from "components/Header";

import { useLayoutContext } from "contexts/LayoutContext";

import { WithChildren } from "types/components";

import classes from "./Layout.module.scss";

export interface LayoutProps extends WithChildren {
	conformity?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, conformity = true }) => {
	const { campaign, layout, meta } = useLayoutContext();

	if (layout === null || meta === null) {
		throw new Error("Missing needed layout data data");
	}

	const { cookie_consent_text, ...props } = layout;

	const [showCookieConsent, setShowCookieConsent] = useState<boolean>(false);
	const sentinel = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting) return;

				if (document && !document.cookie.includes("cookie-consent")) {
					setTimeout(() => setShowCookieConsent(true), 3e3);
				}
			},
			{
				threshold: 0.5,
			}
		);

		const { current } = sentinel;

		if (
			current &&
			!showCookieConsent &&
			!document.cookie.includes("cookie-consent")
		) {
			observer.observe(current);
		}

		return () => {
			if (current) {
				observer.disconnect();
			}
		};
	}, [showCookieConsent]);

	return (
		<main
			className={clsx(
				classes["container"],
				!conformity && classes["non-conformity"]
			)}
		>
			{campaign && <Campaign campaign={campaign} />}
			<Header className={classes["header"]} {...props} />
			<article id="main-content" className={classes["content"]}>
				{children}
			</article>
			<Footer {...props} />
			{showCookieConsent && (
				<FocusScope contain restoreFocus>
					<CookieConsent
						hideFunction={() => setShowCookieConsent(false)}
						text={cookie_consent_text}
					/>
				</FocusScope>
			)}
			<div
				className={classes["cookie-consent-observer"]}
				ref={sentinel}
				aria-hidden
			/>
		</main>
	);
};

export default Layout;

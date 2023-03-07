import { FC, useEffect, useRef, useState } from "react";
import { FocusScope } from "react-aria";
import clsx from "clsx";

import Campaign from "components/Campaign";
import CookieConsent from "components/CookieConsent";
import Footer from "components/Footer";
import Header from "components/Header";

import CampaignSchema from "types/api/campaign";
import PageInformationSchema from "types/api/page-information";
import { WithChildren } from "types/components";

import classes from "./Layout.module.scss";

export interface LayoutProps extends WithChildren, PageInformationSchema {
	campaign: CampaignSchema | null;
	conformity?: boolean;
}

const Layout: FC<LayoutProps> = ({
	campaign,
	children,
	conformity = true,
	cookie_consent_text,
	...props
}) => {
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

import { FC, useEffect, useState } from "react";
import { FocusScope } from "react-aria";
import clsx from "clsx";

import Button from "components/aria/Button";
import Heading from "components/Heading";
import Icon from "components/Icon";
import Markdown from "components/Markdown";

import classes from "./CookieConsent.module.scss";

interface CookieConsentProps {
	text: string;
}

const CookieConsent: FC<CookieConsentProps> = ({ text }) => {
	const [showCookieConsent, setShowCookieConsent] = useState<boolean>(false);

	useEffect(() => {
		if (document && !document.cookie.includes("cookie-consent")) {
			setTimeout(() => setShowCookieConsent(true), 5e3);
		}
	}, []);

	return showCookieConsent ? (
		<FocusScope contain={showCookieConsent} autoFocus={showCookieConsent}>
			<div
				aria-hidden={!showCookieConsent}
				className={clsx(
					classes["container"],
					!showCookieConsent && classes["hidden"]
				)}
			>
				<div className={classes["inner"]}>
					<Heading type="h2" look="h6">
						Cookie Consent
					</Heading>
					<Markdown text={text} />
					<div className={classes["buttons"]}>
						<Button
							className={clsx(
								classes["button"],
								classes["allow"]
							)}
							onPress={() => {
								document.cookie = "cookie-consent=yes";

								if (
									window &&
									"dataLayer" in window &&
									typeof window.dataLayer !== "undefined" &&
									Array.isArray(window.dataLayer)
								) {
									window.dataLayer.push({
										cookie_consent: "yes",
									});
								}

								setShowCookieConsent(false);
							}}
						>
							<Icon variant="done" />
							Allow
						</Button>
						<Button
							className={clsx(classes["button"], classes["deny"])}
							onPress={() => {
								document.cookie = "cookie-consent=no";

								setShowCookieConsent(false);
							}}
						>
							<Icon variant="x-mark" />
							Deny
						</Button>
					</div>
				</div>
			</div>
		</FocusScope>
	) : null;
};

export default CookieConsent;

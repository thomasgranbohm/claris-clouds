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
		if (document) {
			if (!document.cookie.includes("cookie-consent")) {
				setTimeout(() => setShowCookieConsent(true), 5e3);
			}
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
					<div className={classes["text"]}>
						<Markdown text={text} />
					</div>
					<div className={classes["buttons"]}>
						<Button
							className={clsx(
								classes["button"],
								classes["allow"]
							)}
							onPress={() => {
								document.cookie = "cookie-consent=yes";

								if (window && window.dataLayer) {
									window.dataLayer.push({
										cookie_consent: "yes",
										event: "cookie_consent_update",
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
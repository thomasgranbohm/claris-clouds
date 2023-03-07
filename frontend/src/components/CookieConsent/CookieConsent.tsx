import { FC } from "react";
import clsx from "clsx";

import Button from "components/Button";
import Heading from "components/Heading";
import Icon from "components/Icon";
import Markdown from "components/Markdown";

import classes from "./CookieConsent.module.scss";

interface CookieConsentProps {
	hideFunction: () => void;
	text: string;
}

const CookieConsent: FC<CookieConsentProps> = ({ hideFunction, text }) => (
	<div className={classes["container"]}>
		<div className={classes["inner"]}>
			<Heading type="h2" look="h6">
				Cookie Consent
			</Heading>
			<div className={classes["text"]}>
				<Markdown text={text} />
			</div>
			<div className={classes["buttons"]}>
				<Button
					className={clsx(classes["button"], classes["allow"])}
					onPress={() => {
						document.cookie =
							"cookie-consent=yes; SameSite=strict; Max-Age=31536000; Secure";

						if (window && window.dataLayer) {
							window.dataLayer.push({
								cookie_consent: "yes",
								event: "cookie_consent_update",
							});
						}

						hideFunction();
					}}
				>
					<Icon variant="done" />
					Allow
				</Button>
				<Button
					className={clsx(classes["button"], classes["deny"])}
					onPress={() => {
						document.cookie =
							"cookie-consent=no; SameSite=strict; Max-Age=31536000; Secure";

						hideFunction();
					}}
				>
					<Icon variant="x-mark" />
					Deny
				</Button>
			</div>
		</div>
	</div>
);

export default CookieConsent;

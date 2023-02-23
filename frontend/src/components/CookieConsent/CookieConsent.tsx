import { FC, useEffect, useState } from "react";
import { FocusScope } from "react-aria";
import clsx from "clsx";

import Button from "components/aria/Button";
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
							"cookie-consent=yes; Secure; SameSite=strict; Max-Age=31536000";

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
						document.cookie = "cookie-consent=no";

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

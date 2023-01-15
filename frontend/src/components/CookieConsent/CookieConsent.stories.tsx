import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import CookieConsent from "./CookieConsent";

export default {
	component: CookieConsent,
	title: "CookieConsent",
} as ComponentMeta<typeof CookieConsent>;

export const Primary: ComponentStory<typeof CookieConsent> = (props) => (
	<CookieConsent />
);

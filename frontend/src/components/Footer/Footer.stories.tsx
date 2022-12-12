import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Footer from "./Footer";

export default {
	component: Footer,
	title: "Footer",
} as ComponentMeta<typeof Footer>;

export const Primary: ComponentStory<typeof Footer> = (props) => (
	<Footer {...props} />
);

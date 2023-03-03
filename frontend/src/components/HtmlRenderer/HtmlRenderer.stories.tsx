import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import HtmlRenderer from "./HtmlRenderer";

export default {
	component: HtmlRenderer,
	title: "HtmlRenderer",
} as ComponentMeta<typeof HtmlRenderer>;

export const Primary: ComponentStory<typeof HtmlRenderer> = (props) => (
	<HtmlRenderer {...props} />
);

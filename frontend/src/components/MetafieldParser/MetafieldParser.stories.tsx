import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import MetafieldParser from "./MetafieldParser";

export default {
	component: MetafieldParser,
	title: "MetafieldParser",
} as ComponentMeta<typeof MetafieldParser>;

export const Primary: ComponentStory<typeof MetafieldParser> = (props) => (
	<MetafieldParser {...props} />
);

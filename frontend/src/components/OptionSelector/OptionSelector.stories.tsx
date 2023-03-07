import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import OptionSelector from "./OptionSelector";

export default {
	component: OptionSelector,
	title: "OptionSelector",
} as ComponentMeta<typeof OptionSelector>;

export const Primary: ComponentStory<typeof OptionSelector> = (props) => (
	<OptionSelector {...props} />
);

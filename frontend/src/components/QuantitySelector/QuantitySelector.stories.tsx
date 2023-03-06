import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import QuantitySelector from "./QuantitySelector";

export default {
	component: QuantitySelector,
	title: "QuantitySelector",
} as ComponentMeta<typeof QuantitySelector>;

export const Primary: ComponentStory<typeof QuantitySelector> = (props) => (
	<QuantitySelector {...props} />
);

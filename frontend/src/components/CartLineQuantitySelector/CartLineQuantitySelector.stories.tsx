import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import CartLineQuantitySelector from "./CartLineQuantitySelector";

export default {
	component: CartLineQuantitySelector,
	title: "CartLineQuantitySelector",
} as ComponentMeta<typeof CartLineQuantitySelector>;

export const Primary: ComponentStory<typeof CartLineQuantitySelector> = (props) => (
	<CartLineQuantitySelector {...props} />
);

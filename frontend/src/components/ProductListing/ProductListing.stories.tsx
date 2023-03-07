import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ProductListing from "./ProductListing";

export default {
	component: ProductListing,
	title: "ProductListing",
} as ComponentMeta<typeof ProductListing>;

export const Primary: ComponentStory<typeof ProductListing> = (props) => (
	<ProductListing {...props} />
);

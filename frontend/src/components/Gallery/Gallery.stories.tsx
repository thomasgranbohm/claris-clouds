import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Gallery from "./Gallery";

export default {
	component: Gallery,
	title: "Gallery",
} as ComponentMeta<typeof Gallery>;

export const Primary: ComponentStory<typeof Gallery> = (props) => (
	<Gallery {...props} />
);

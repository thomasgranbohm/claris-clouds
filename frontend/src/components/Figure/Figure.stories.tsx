import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Figure from "./Figure";

export default {
	component: Figure,
	title: "Figure",
} as ComponentMeta<typeof Figure>;

export const Primary: ComponentStory<typeof Figure> = (props) => (
	<Figure {...props} />
);

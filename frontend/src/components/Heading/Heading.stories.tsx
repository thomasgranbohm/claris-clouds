import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Heading from "./Heading";

export default {
	argTypes: {
		look: {
			control: "select",
			options: ["h1", "h2", "h3", "h4", "h5", "h6", "b"],
		},
		type: {
			control: "select",
			options: ["h1", "h2", "h3", "h4", "h5", "h6", "b"],
		},
	},
	args: {
		children: "Hello, World!",
		type: "h1",
	},
	component: Heading,
	title: "Heading",
} as ComponentMeta<typeof Heading>;

export const Primary: ComponentStory<typeof Heading> = (props) => (
	<Heading {...props} />
);

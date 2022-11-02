import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Cover from "./Cover";

export default {
	component: Cover,
	title: "Cover",
} as ComponentMeta<typeof Cover>;

export const Primary: ComponentStory<typeof Cover> = (props) => (
	<Cover {...props} />
);

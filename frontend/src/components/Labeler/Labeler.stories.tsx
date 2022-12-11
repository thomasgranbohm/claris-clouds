import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Labeler from "./Labeler";

export default {
	component: Labeler,
	title: "Labeler",
} as ComponentMeta<typeof Labeler>;

export const Primary: ComponentStory<typeof Labeler> = (props) => (
	<Labeler {...props} />
);

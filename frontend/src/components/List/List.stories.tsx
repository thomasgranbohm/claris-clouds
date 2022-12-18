import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import List from "./List";

export default {
	component: List,
	title: "List",
} as ComponentMeta<typeof List>;

export const Primary: ComponentStory<typeof List> = (props) => (
	<List {...props} />
);

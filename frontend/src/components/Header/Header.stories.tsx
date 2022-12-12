import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Header from "./Header";

export default {
	component: Header,
	title: "Header",
} as ComponentMeta<typeof Header>;

export const Primary: ComponentStory<typeof Header> = (props) => (
	<Header {...props} />
);

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Navigation from "./Navigation";

export default {
	component: Navigation,
	title: "Navigation",
} as ComponentMeta<typeof Navigation>;

export const Primary: ComponentStory<typeof Navigation> = (props) => (
	<Navigation {...props} />
);

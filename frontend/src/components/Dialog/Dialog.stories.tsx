import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Dialog from "./Dialog";

export default {
	component: Dialog,
	title: "Dialog",
} as ComponentMeta<typeof Dialog>;

export const Primary: ComponentStory<typeof Dialog> = (props) => (
	<Dialog {...props} />
);

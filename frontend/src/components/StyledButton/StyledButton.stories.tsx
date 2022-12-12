import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import StyledButton from "./StyledButton";

export default {
	component: StyledButton,
	title: "StyledButton",
} as ComponentMeta<typeof StyledButton>;

export const Primary: ComponentStory<typeof StyledButton> = (props) => (
	<StyledButton {...props} />
);

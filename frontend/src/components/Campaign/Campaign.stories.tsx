import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Campaign from "./Campaign";

export default {
	component: Campaign,
	title: "Campaign",
} as ComponentMeta<typeof Campaign>;

export const Primary: ComponentStory<typeof Campaign> = (props) => (
	<Campaign {...props} />
);

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import MetaData from "./MetaData";

export default {
	component: MetaData,
	title: "MetaData",
} as ComponentMeta<typeof MetaData>;

export const Primary: ComponentStory<typeof MetaData> = (props) => (
	<MetaData {...props} />
);

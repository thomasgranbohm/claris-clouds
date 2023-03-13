import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ImageWithZoom from "./ImageWithZoom";

export default {
	component: ImageWithZoom,
	title: "ImageWithZoom",
} as ComponentMeta<typeof ImageWithZoom>;

export const Primary: ComponentStory<typeof ImageWithZoom> = (props) => (
	<ImageWithZoom {...props} />
);

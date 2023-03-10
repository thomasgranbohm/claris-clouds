import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ImageWithPreview from "./ImageWithPreview";

export default {
	component: ImageWithPreview,
	title: "ImageWithPreview",
} as ComponentMeta<typeof ImageWithPreview>;

export const Primary: ComponentStory<typeof ImageWithPreview> = (props) => (
	<ImageWithPreview {...props} />
);

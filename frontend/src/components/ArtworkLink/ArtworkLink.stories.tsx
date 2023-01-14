import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ArtworkLink from "./ArtworkLink";

export default {
	component: ArtworkLink,
	title: "ArtworkLink",
} as ComponentMeta<typeof ArtworkLink>;

export const Primary: ComponentStory<typeof ArtworkLink> = (props) => (
	<ArtworkLink {...props} />
);

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Link from "./Link";

export default {
	component: Link,
	title: "Link",
} as ComponentMeta<typeof Link>;

export const Primary: ComponentStory<typeof Link> = (props) => (
	<Link {...props} />
);

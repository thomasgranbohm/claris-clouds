import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Heading from "components/Heading";

import Layout from "./Layout";

export default {
	title: "Layout",
	component: Layout,
} as ComponentMeta<typeof Layout>;

export const Primary: ComponentStory<typeof Layout> = (props) => (
	<Layout {...props}>
		<Heading type="h1">Lorem ipsum</Heading>
	</Layout>
);

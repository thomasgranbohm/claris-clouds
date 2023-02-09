import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Heading from "components/Heading";

import Grid, { Column, Row } from "./Grid";

export default {
	component: Grid,
	title: "Grid",
} as ComponentMeta<typeof Grid>;

export const Primary: ComponentStory<typeof Grid> = (props) => (
	<Grid {...props} />
);

export const GridInGrid: ComponentStory<typeof Grid> = () => (
	<Row>
		<Column>
			<Heading type="h1">Hello, world!</Heading>
			<Row>
				<Column xs={6}>test</Column>
				<Column xs={6}>test2</Column>
			</Row>
		</Column>
	</Row>
);

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Column from "../Column";
import Row from "../Row";

import Image from "./Image";

export default {
	title: "Image",
	component: Image,
} as ComponentMeta<typeof Image>;

export const Primary: ComponentStory<typeof Image> = () => (
	<Row>
		<Column sm={1}>
			<Image
				alt="kat"
				height={300}
				layout="responsive"
				src="https://placekitten.com/200/300"
				width={200}
			/>
		</Column>
	</Row>
);

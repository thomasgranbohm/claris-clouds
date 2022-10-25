import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Column from "../Column";

import Row from "./Row";

export default {
	component: Row,
	title: "Grid",
} as ComponentMeta<typeof Row>;

export const Primary: ComponentStory<typeof Row> = () => (
	<Row>
		<Column sm={12} md={[8, 2]} lg={[6, 3]} xl={[4, 4]}>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
			consectetur quisquam iure officia tempora! Hic, iusto debitis porro
			ad, ex aspernatur amet ipsam quos obcaecati minima, adipisci
			tenetur? Excepturi, maiores.
		</Column>
	</Row>
);

export const TwoColumns: ComponentStory<typeof Row> = () => (
	<Row>
		<Column sm={6} lg={4} xl={3}>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
			consectetur quisquam iure officia tempora! Hic, iusto debitis porro
			ad, ex aspernatur amet ipsam quos obcaecati minima, adipisci
			tenetur? Excepturi, maiores.
		</Column>
		<Column sm={6} lg={4} xl={3}>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
			consectetur quisquam iure officia tempora! Hic, iusto debitis porro
			ad, ex aspernatur amet ipsam quos obcaecati minima, adipisci
			tenetur? Excepturi, maiores.
		</Column>
	</Row>
);

export const StartOffset: ComponentStory<typeof Row> = () => (
	<Row>
		<Column sm={6} lg={[4, 8]} xl={3}>
			FIRST Lorem, ipsum dolor sit amet consectetur adipisicing elit.
			Cupiditate consectetur quisquam iure officia tempora! Hic, iusto
			debitis porro ad, ex aspernatur amet ipsam quos obcaecati minima,
			adipisci tenetur? Excepturi, maiores.
		</Column>
		<Column sm={6} lg={4} xl={3}>
			SECOND Lorem, ipsum dolor sit amet consectetur adipisicing elit.
			Cupiditate consectetur quisquam iure officia tempora! Hic, iusto
			debitis porro ad, ex aspernatur amet ipsam quos obcaecati minima,
			adipisci tenetur? Excepturi, maiores.
		</Column>
	</Row>
);

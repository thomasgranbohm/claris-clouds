import { FC } from "react";
import clsx from "clsx";

import { Column, Row } from "components/Grid";
import Markdown from "components/Markdown";

import { RichTextSchema } from "types/sections";

import classes from "../../ComponentRenderer.module.scss";

const RichText: FC<RichTextSchema> = ({ text }) => {
	return (
		<Row className={clsx(classes["container"], classes["rich-text"])}>
			<Column md={[8, 2]} lg={[6, 3]} className={classes["text"]}>
				<Markdown text={text} />
			</Column>
		</Row>
	);
};

export default RichText;

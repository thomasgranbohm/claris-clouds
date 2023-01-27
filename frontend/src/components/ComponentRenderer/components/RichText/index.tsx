import { FC } from "react";
import clsx from "clsx";

import Column from "components/Column";
import Markdown from "components/Markdown";
import Row from "components/Row";

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

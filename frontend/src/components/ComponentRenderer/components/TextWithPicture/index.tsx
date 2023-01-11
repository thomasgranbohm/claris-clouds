import { FC } from "react";
import clsx from "clsx";

import Column from "components/Column";
import { StrapiImage } from "components/Image";
import Markdown from "components/Markdown";
import Row from "components/Row";

import { TextWithPictureSchema } from "types/sections";

import classes from "../../ComponentRenderer.module.scss";

const TextWithPicture: FC<TextWithPictureSchema> = ({
	image,
	text,
	twp_picture_alignment: picture_alignment,
}) => {
	return (
		<Row
			className={clsx(
				classes["container"],
				classes["text-with-picture"],
				classes[`align--${picture_alignment}`]
			)}
		>
			<Column lg={8} xl={6} justify="center">
				<StrapiImage className={classes["image"]} image={image} />
			</Column>
			<Column lg={4} xl={6}>
				<div className={classes["text"]}>
					<Markdown text={text} />
				</div>
			</Column>
		</Row>
	);
};

export default TextWithPicture;

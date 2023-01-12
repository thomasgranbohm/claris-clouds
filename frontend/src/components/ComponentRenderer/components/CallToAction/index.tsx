import { FC } from "react";
import clsx from "clsx";

import Column from "components/Column";
import Figure from "components/Figure";
import { NoWhitespaceImage } from "components/Image";
import { StyledLink } from "components/Link";
import Markdown from "components/Markdown";
import Row from "components/Row";

import { CallToActionSchema } from "types/sections";

import stripWrapper from "utils/stripWrapper";

import classes from "../../ComponentRenderer.module.scss";

const CallToAction: FC<CallToActionSchema> = ({
	image,
	image_alignment,
	link,
	text,
	type,
}) => {
	console.log(image);
	return (
		<Row
			className={clsx(
				classes["container"],
				classes["call-to-action"],
				classes[`align--${image_alignment.toLowerCase()}`],
				classes[`type--${type.toLowerCase().replaceAll("_", "-")}`]
			)}
		>
			<Column
				lg={6}
				align={
					type === "Centered"
						? "center"
						: type === "Gravity"
						? "end"
						: undefined
				}
				justify="center"
			>
				<Figure
					className={classes["image"]}
					caption={
						stripWrapper(image).caption !== stripWrapper(image).name
							? stripWrapper(image).caption
							: undefined
					}
				>
					<NoWhitespaceImage
						image={image}
						style={{
							height: "auto",
							maxHeight: "60vh",
							objectFit: "contain",
							objectPosition: "center",
							width: type === "Centered" ? "auto" : "100%",
						}}
					/>
				</Figure>
			</Column>
			<Column
				lg={6}
				align={
					type === "Centered"
						? "center"
						: type === "Gravity"
						? "end"
						: undefined
				}
			>
				<div className={classes["text"]}>
					<Markdown text={text} />
				</div>
				{link && (
					<StyledLink className={classes["link"]} href={link.path}>
						{link.label}
					</StyledLink>
				)}
			</Column>
		</Row>
	);
};

export default CallToAction;

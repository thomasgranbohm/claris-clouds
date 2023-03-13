import { FC } from "react";
import clsx from "clsx";

import Figure from "components/Figure";
import { Column, Row } from "components/Grid";
import { NoWhitespaceImage } from "components/Image";
import { StyledLink } from "components/Link";
import Markdown from "components/Markdown";

import { CallToActionSchema } from "types/sections";

import generateImageBreakpoints from "utils/generateImageBreakpoints";
import stripWrapper from "utils/stripWrapper";

import classes from "../../ComponentRenderer.module.scss";

const CallToAction: FC<CallToActionSchema> = ({
	image,
	image_alignment,
	link,
	text,
	type,
}) => {
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
				className={classes["column"]}
				md={6}
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
							maxWidth: "100%",
							objectFit: "contain",
							objectPosition: "center",
							width: type === "Centered" ? "auto" : "100%",
						}}
						sizes={generateImageBreakpoints({
							lg: 0.5,
							md: 1,
							sm: 1,
							xl: 0.5,
							xs: "100vw",
						})}
					/>
				</Figure>
			</Column>
			<Column
				className={classes["column"]}
				md={6}
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
					{link && (
						<StyledLink
							className={classes["link"]}
							href={link.path}
						>
							{link.label}
						</StyledLink>
					)}
				</div>
			</Column>
		</Row>
	);
};

export default CallToAction;

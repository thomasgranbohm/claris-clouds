import { FC } from "react";
import clsx from "clsx";

import Column from "components/Column";
import Heading from "components/Heading";
import { NoWhitespaceImage } from "components/Image";
import { StyledLink } from "components/Link";
import Row from "components/Row";
import Typography from "components/Typography";

import { CallToActionSchema } from "types/sections";

import classes from "../../ComponentRenderer.module.scss";

const CallToAction: FC<CallToActionSchema> = ({
	cta_picture_alignment: picture_alignment,
	image,
	link,
	text,
	title,
}) => {
	return (
		<Row
			className={clsx(
				classes["container"],
				classes["call-to-action"],
				classes[`align--${picture_alignment}`]
			)}
		>
			<Column lg={8} xl={6} align="end" justify="center">
				<NoWhitespaceImage
					image={image}
					style={{
						height: "auto",
						maxHeight: "60vh",
						objectFit: "contain",
						objectPosition: "center",
						width: "100%",
					}}
				/>
			</Column>
			<Column lg={4} xl={6} align="end">
				{title && <Heading type="h3">{title}</Heading>}
				<Typography>{text}</Typography>
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

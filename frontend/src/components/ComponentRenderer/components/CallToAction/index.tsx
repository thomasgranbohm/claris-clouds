import { FC } from "react";
import clsx from "clsx";

import Column from "components/Column";
import Heading from "components/Heading";
import { StrapiImage } from "components/Image";
import { StyledLink } from "components/Link";
import Row from "components/Row";
import Typography from "components/Typography";

import { CallToActionSchema } from "types/sections";

import classes from "../../ComponentRenderer.module.scss";

const CallToAction: FC<CallToActionSchema> = ({ image, link, text, title }) => {
	return (
		<Row className={clsx(classes["container"], classes["call-to-action"])}>
			<Column lg={8} xl={6} align="end" justify="center">
				<StrapiImage className={classes["image"]} image={image} />
			</Column>
			<Column lg={4} xl={6} align="end">
				{title && <Heading type="h3">{title}</Heading>}
				<Typography>{text}</Typography>
				{link && (
					<Row>
						<Column sm={[10, 1]} md={[8, 2]} lg={12} xl={8}>
							<StyledLink href={link.path} asWrapper>
								{link.label}
							</StyledLink>
						</Column>
					</Row>
				)}
			</Column>
		</Row>
	);
};

export default CallToAction;

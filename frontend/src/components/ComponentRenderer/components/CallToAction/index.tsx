import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import Button from "components/Button";
import Column from "components/Column";
import Heading from "components/Heading";
import Image from "components/Image";
import Link from "components/Link";
import Row from "components/Row";
import Typography from "components/Typography";

import { CallToActionSchema } from "types/sections";

import classes from "../../ComponentRenderer.module.scss";

const CallToAction: FC<CallToActionSchema> = ({ image, link, text, title }) => {
	return (
		<Row className={classes["call-to-action"]}>
			<Column lg={8} xl={6}>
				<Image
					className={classes["image"]}
					alt={image.data.attributes.alternativeText}
					height={image.data.attributes.height}
					layout="fill"
					objectFit="contain"
					src={image.data.attributes.hash + image.data.attributes.ext}
					width={image.data.attributes.width}
				/>
			</Column>
			<Column lg={4} xl={6} align="end">
				{title && <Heading type="h3">{title}</Heading>}
				<Typography>{text}</Typography>
				{link && (
					<Row>
						<Column sm={[10, 1]} md={[8, 2]} lg={12} xl={8}>
							<Link href={link.path} asWrapper>
								<Button>{link.label}</Button>
							</Link>
						</Column>
					</Row>
				)}
			</Column>
		</Row>
	);
};

export default CallToAction;

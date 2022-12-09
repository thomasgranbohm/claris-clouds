import { FC } from "react";

import Column from "components/Column";
import Heading from "components/Heading";
import Image from "components/Image";
import Link from "components/Link";
import Row from "components/Row";

import { ArtworkDisplaySchema } from "types/sections";

import stripWrapper from "utils/stripWrapper";

import classes from "../../ComponentRenderer.module.scss";

const ArtworkDisplay: FC<ArtworkDisplaySchema> = ({ artworks, title }) => {
	const stripped = stripWrapper(artworks);

	return (
		<div className={classes["artwork-display"]}>
			<Heading type="h2">{title}</Heading>
			<Row>
				{stripped.map(({ image, name, slug }, i) => (
					<Column
						sm={6}
						md={4}
						key={i}
						className={classes["artwork"]}
					>
						<Link
							href={`artwork/${slug}`}
							className={classes["link"]}
							asWrapper
						>
							<Image
								className={classes["image"]}
								alt={image.data.attributes.alternativeText}
								height={image.data.attributes.height}
								layout="fill"
								objectFit="contain"
								src={
									image.data.attributes.hash +
									image.data.attributes.ext
								}
								width={image.data.attributes.width}
							/>
							<Heading
								type="b"
								look="h6"
								className={classes["title"]}
							>
								{name}
							</Heading>
						</Link>
					</Column>
				))}
			</Row>
		</div>
	);
};

export default ArtworkDisplay;

import { FC } from "react";

import Column from "components/Column";
import Heading from "components/Heading";
import { StrapiImage } from "components/Image";
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
							<StrapiImage
								className={classes["image"]}
								image={image}
								layout="fill"
								objectFit="contain"
							/>
							<Heading type="b" className={classes["title"]}>
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

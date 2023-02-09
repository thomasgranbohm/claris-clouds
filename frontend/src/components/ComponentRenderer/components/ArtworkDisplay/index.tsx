import { FC } from "react";
import clsx from "clsx";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import { StrapiImage } from "components/Image";
import Link from "components/Link";

import { ArtworkDisplaySchema } from "types/sections";

import stripWrapper from "utils/stripWrapper";

import classes from "../../ComponentRenderer.module.scss";

const ArtworkDisplay: FC<ArtworkDisplaySchema> = ({ artworks, title }) => {
	const stripped = stripWrapper(artworks);

	return (
		<div className={clsx(classes["container"], classes["artwork-display"])}>
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
							<div className={classes["image-container"]}>
								<StrapiImage
									fill
									image={image}
									objectFit="contain"
								/>
							</div>
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

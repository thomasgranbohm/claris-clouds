import { FC } from "react";
import { ImageProps } from "next/image";

import { NoWhitespaceImage } from "components/Image";
import Link from "components/Link";

import ArtworkSchema from "types/api/artwork";
import { ImageSchema } from "types/api/strapi";

import classes from "./ArtworkLink.module.scss";

interface ArtworkLinkProps {
	artwork: ArtworkSchema;
	imageProps: Partial<ImageProps>;
}

const ArtworkLink: FC<ArtworkLinkProps> = ({ artwork, imageProps }) => {
	const { image, slug } = artwork;

	return (
		<Link className={classes["container"]} href={`/artwork/${slug}`}>
			<NoWhitespaceImage
				className={classes["image"]}
				image={image}
				{...imageProps}
			/>
		</Link>
	);
};

export default ArtworkLink;

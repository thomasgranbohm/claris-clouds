import { FC, HTMLAttributes } from "react";
import { ImageProps } from "next/image";

import { NoWhitespaceImage } from "components/Image";
import Link from "components/Link";

import ArtworkSchema from "types/api/artwork";

import classes from "./ArtworkLink.module.scss";

interface ArtworkLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	artwork: ArtworkSchema;
	imageProps: Partial<ImageProps>;
}

const ArtworkLink: FC<ArtworkLinkProps> = ({ artwork, imageProps }) => {
	const { image, name, slug } = artwork;

	return (
		<Link
			aria-label={`Link to artwork titled ${name}`}
			className={classes["container"]}
			href={`/artwork/${slug}`}
		>
			<NoWhitespaceImage
				className={classes["image"]}
				image={image}
				title={name}
				{...imageProps}
			/>
		</Link>
	);
};

export default ArtworkLink;

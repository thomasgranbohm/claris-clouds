import { FC, useMemo, useRef } from "react";

import { StrapiImage } from "components/Image";
import Link from "components/Link";

import useBreakpoint from "hooks/useBreakpoint";

import Artwork from "types/api/artwork";
import { ImageSchema } from "types/api/strapi";
import { BREAKPOINTS } from "types/generics";

import stripWrapper from "utils/stripWrapper";

import classes from "./Gallery.module.scss";

/**
 * TODO: This component isn't very cleanly coded and should be reworked
 * Especially the GAP part.
 */

interface GalleryProps {
	artworks: Artwork[];
}

interface GalleryItemProps extends Artwork {
	layout?: "responsive";
}

const GalleryItem: FC<GalleryItemProps> = ({ image, layout, slug }) => {
	return (
		<Link href={`/artwork/${slug}`} className={classes["item"]}>
			<StrapiImage image={image} layout={layout} />
		</Link>
	);
};

const GAP = 18;

const Gallery: FC<GalleryProps> = ({ artworks }) => {
	const breakpoint = useBreakpoint();

	const ref = useRef<HTMLDivElement>(null);

	const parsedArtworks = useMemo(() => {
		const parsed: Array<GalleryItemProps> = [];

		if (!ref.current) {
			return null;
		}

		const getAspectRatio = (img: Pick<ImageSchema, "width" | "height">) =>
			img.width / img.height;

		if (breakpoint !== null && breakpoint !== BREAKPOINTS.sm) {
			for (let index = 0; parsed.length < artworks.length; index++) {
				const toPick = breakpoint === BREAKPOINTS.md ? 2 : 3;
				const sliced = artworks.slice(
					parsed.length,
					parsed.length + toPick
				);

				const picked = [];
				for (const artwork of sliced) {
					const image = stripWrapper(artwork.image);

					picked.push(artwork);

					if (getAspectRatio(image) > 2) {
						break;
					}
				}

				const images = picked.map(({ image }) => stripWrapper(image));

				const biggestHeight = Math.max(
					...images.map(({ height }) => height)
				);

				const scaled = images.map(({ height, width, ...rest }) => {
					const m = biggestHeight / height;

					return {
						...rest,
						height: m * height,
						width:
							m *
							height *
							getAspectRatio({ ...rest, height, width }),
					};
				});

				const WIDTH =
					ref.current.clientWidth - GAP * (picked.length - 1);

				const combinedWidths = scaled.reduce((p, c) => p + c.width, 0);
				const multiplier = combinedWidths / WIDTH;

				parsed.push(
					...picked.map(({ image, ...artwork }, index) => {
						const { height, width } = scaled[index];

						image.data.attributes.height = height / multiplier;
						image.data.attributes.width = width / multiplier;

						return {
							...artwork,
							image,
						};
					})
				);
			}
		} else {
			parsed.push(
				...artworks.map<GalleryItemProps>((artwork) => ({
					...artwork,
					layout: "responsive",
				}))
			);
		}

		return parsed.map((props) => (
			<GalleryItem {...props} key={props.slug} />
		));
	}, [artworks, breakpoint, ref]);

	return (
		<div
			ref={ref}
			className={classes["container"]}
			style={{ gap: GAP + "px" }}
		>
			{parsedArtworks}
		</div>
	);
};

export default Gallery;

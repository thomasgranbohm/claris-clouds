import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { StrapiImage } from "components/Image";
import Link from "components/Link";

import useBreakpoint from "hooks/useBreakpoint";

import Artwork from "types/api/artwork";
import { ImageSchema } from "types/api/strapi";
import { Breakpoint } from "types/generics";

import stripWrapper from "utils/stripWrapper";

import classes from "./Gallery.module.scss";

/**
 * TODO: This component isn't very cleanly coded and should be reworked
 * Especially the GAP part.
 */

interface GalleryProps {
	artworks: Artwork[];
}

const GAP = 36;

const Gallery: FC<GalleryProps> = ({ artworks }) => {
	const breakpoint = useBreakpoint();

	const ref = useRef<HTMLDivElement>(null);

	const [parsedArtworks, setParsedArtworks] = useState<ReactNode>();

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const getAspectRatio = (img: Pick<ImageSchema, "width" | "height">) =>
			img.width / img.height;

		if (Number(breakpoint) > Breakpoint.sm) {
			const parsed: Array<Artwork> = [];

			for (let index = 0; parsed.length < artworks.length; index++) {
				const toPick = breakpoint === Breakpoint.md ? 2 : 3;
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
					return {
						...rest,
						height: biggestHeight,
						width: Math.floor(
							biggestHeight * getAspectRatio({ height, width })
						),
					};
				});

				const WIDTH =
					ref.current.clientWidth - GAP * (picked.length - 1);

				const combinedWidths = scaled.reduce((p, c) => p + c.width, 0);
				const multiplier = combinedWidths / WIDTH;

				const combinedScaledWidths = Number(
					scaled
						.reduce((p, c) => p + c.width / multiplier, 0)
						.toFixed(2)
				);

				console.assert(
					combinedScaledWidths === WIDTH,
					`Width should be ${WIDTH}, was ${combinedScaledWidths}`
				);

				parsed.push(
					...picked.map(({ image, ...artwork }, index) => {
						const { height, width } = scaled[index];

						image.data.attributes.height = height / multiplier;
						image.data.attributes.width = Math.floor(
							width / multiplier
						);

						return {
							...artwork,
							image,
						};
					})
				);
			}
			setParsedArtworks(
				parsed.map(({ image, slug }, i) => (
					<Link
						href={`/artwork/${slug}`}
						className={classes["item"]}
						key={slug}
					>
						<StrapiImage image={image} priority={i <= 6} />
					</Link>
				))
			);
		} else {
			setParsedArtworks(
				artworks.map(({ image, slug }, i) => (
					<Link
						href={`/artwork/${slug}`}
						className={classes["item"]}
						key={slug}
					>
						<StrapiImage
							image={image}
							priority={i < 2}
							style={{ height: "auto", width: "100%" }}
							sizes="100vw"
						/>
					</Link>
				))
			);
		}
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

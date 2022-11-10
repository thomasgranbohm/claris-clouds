import { FC, Fragment, ReactNode, useMemo, useState } from "react";
import { assert } from "console";
import useBreakpoint from "hooks/useBreakpoint";
import stripWrapper from "utils/stripWrapper";

import Column from "components/Column";
import Image from "components/Image";
import Link from "components/Link";
import Row from "components/Row";

import Artwork from "types/api/artwork";
import { ImageSchema } from "types/api/strapi";
import { BREAKPOINTS } from "types/generics";

import classes from "./Gallery.module.scss";

interface GalleryProps {
	artworks: Artwork[];
}

interface GalleryItemProps {
	alternativeText: string;
	ext: string;
	hash: string;
	height: number;
	layout?: "responsive";
	slug: string;
	width: number;
}

const GalleryItem: FC<GalleryItemProps> = ({
	alternativeText,
	ext,
	hash,
	height,
	layout,
	slug,
	width,
}) => (
	<Link href={`/artwork/${slug}`} className={classes["item"]}>
		<Image
			src={hash + ext}
			alt={alternativeText}
			layout={layout}
			height={height}
			width={width}
		/>
	</Link>
);

const Gallery: FC<GalleryProps> = ({ artworks }) => {
	const breakpoint = useBreakpoint();

	const parsedArtworks = useMemo(() => {
		const parsed = [];

		if (breakpoint !== null && breakpoint !== BREAKPOINTS.sm) {
			for (
				let actualIndex = 0;
				parsed.length < artworks.length;
				actualIndex++
			) {
				let amountOnRow = null;

				switch (breakpoint) {
					case BREAKPOINTS.md:
						amountOnRow = 2;
						break;
					case BREAKPOINTS.lg:
					case BREAKPOINTS.xl:
						amountOnRow = actualIndex % 2 == 0 ? 3 : 2;
						break;
					default:
						amountOnRow = 1;
				}

				const sliced = artworks.slice(
					parsed.length,
					parsed.length + amountOnRow
				);
				const actualAmount = sliced.length;
				const images = sliced.map(({ image }) => stripWrapper(image));

				const biggestHeight = Math.max(
					...images.map(({ height }) => height)
				);

				const getAspectRatio = (img: ImageSchema) =>
					img.width / img.height;

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

				const WIDTH = breakpoint - 18 * 2 - 18 * (actualAmount - 1);

				const combinedWidths = scaled.reduce((p, c) => p + c.width, 0);
				const multiplier = combinedWidths / WIDTH;

				parsed.push(
					...sliced.map(({ image, slug }, index) => {
						const { alternativeText, ext, hash } =
							stripWrapper(image);
						const { height, width } = scaled[index];

						return (
							<GalleryItem
								key={parsed.length + index}
								slug={slug}
								hash={hash}
								ext={ext}
								alternativeText={alternativeText}
								width={width / multiplier}
								height={height / multiplier}
							/>
						);
					})
				);
			}
		} else {
			parsed.push(
				artworks.map(({ image, slug }, index) => {
					const { alternativeText, ext, hash, height, width } =
						stripWrapper(image);

					return (
						<GalleryItem
							key={index}
							slug={slug}
							hash={hash}
							ext={ext}
							layout="responsive"
							alternativeText={alternativeText}
							width={width}
							height={height}
						/>
					);
				})
			);
		}

		console.log(parsed.length);

		return parsed;
	}, [artworks, breakpoint]);

	return (
		<>
			{breakpoint}
			<div className={classes["container"]}>{parsedArtworks}</div>
		</>
	);
};

export default Gallery;

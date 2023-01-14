import { FC, ReactNode, useMemo, useRef } from "react";

import useBreakpoint from "hooks/useBreakpoint";

import ArtworkSchema from "types/api/artwork";
import { ImageSchema } from "types/api/strapi";
import { Breakpoint, BreakpointNames } from "types/generics";

import stripWrapper from "utils/stripWrapper";

import classes from "./Gallery.module.scss";

/**
 * TODO: This component isn't very cleanly coded and should be reworked
 * Especially the GAP part.
 */

interface GalleryProps {
	artworks: ArtworkSchema[];
	gap?: number;
	renderChild: (
		props: ArtworkSchema,
		index: number,
		breakpoint: Breakpoint | null
	) => ReactNode;
	rows?: Partial<
		{ defaultRow: number } & { [key in BreakpointNames]: number }
	>;
}

const Gallery: FC<GalleryProps> = ({
	artworks,
	gap = 36,
	renderChild,
	rows = { defaultRow: 1, lg: 3, md: 2 },
}) => {
	const breakpoint = useBreakpoint();
	const ref = useRef<HTMLDivElement>(null);

	const parsedArtworks = useMemo(() => {
		if (!ref.current) {
			return [];
		}

		const getAspectRatio = (img: Pick<ImageSchema, "width" | "height">) =>
			img.width / img.height;

		const parsed: Array<ArtworkSchema> = [];

		const { defaultRow, ...breakpoints } = rows;
		const toPick =
			Object.entries(breakpoints)
				.map(([k, v]) => [Breakpoint[k as BreakpointNames], v])
				.sort(([a], [b]) => b - a)
				.find(([b]) => Number(breakpoint) >= b)?.[1] ||
			defaultRow ||
			1;

		for (let index = 0; parsed.length < artworks.length; index++) {
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

			const containerWidth =
				ref.current.clientWidth - gap * (picked.length - 1);

			const combinedWidths = scaled.reduce((p, c) => p + c.width, 0);
			const multiplier = combinedWidths / containerWidth;

			const combinedScaledWidths = Number(
				scaled.reduce((p, c) => p + c.width / multiplier, 0).toFixed(2)
			);

			console.assert(
				combinedScaledWidths === containerWidth,
				`Width should be ${containerWidth}, was ${combinedScaledWidths}`
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

		return parsed.map((props, i) => renderChild(props, i, breakpoint));
	}, [artworks, breakpoint, gap, ref, renderChild, rows]);

	return (
		<div
			ref={ref}
			className={classes["container"]}
			style={{ gap: gap + "px" }}
			role="feed"
		>
			{parsedArtworks}
		</div>
	);
};

export default Gallery;

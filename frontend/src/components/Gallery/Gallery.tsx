import { FC, HTMLAttributes, ReactNode, useMemo, useRef } from "react";
import clsx from "clsx";

import useBreakpoint from "hooks/useBreakpoint";

import ArtworkSchema from "types/api/artwork";
import { ImageSchema } from "types/api/strapi";
import { Breakpoint, BreakpointNames } from "types/generics";

import getGutter from "utils/getGutter";
import stripWrapper from "utils/stripWrapper";

import classes from "./Gallery.module.scss";

/**
 * TODO: This component isn't very cleanly coded and should be reworked
 */

interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
	artworks: ArtworkSchema[];
	fill?: boolean;
	gutter?: Partial<
		{ defaultGutter: number } & { [key in BreakpointNames]: number }
	>;
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
	className,
	fill = true,
	gutter: multiplier = { defaultGutter: 1 },
	renderChild,
	rows = { defaultRow: 1, lg: 3, md: 2 },
	...props
}) => {
	const breakpoint = useBreakpoint();
	const ref = useRef<HTMLDivElement>(null);

	const gutter = useMemo(() => {
		const { defaultGutter, ...gutters } = multiplier;
		return getGutter(
			Object.entries(gutters)
				.map(([k, v]) => [Breakpoint[k as BreakpointNames], v])
				.sort(([a], [b]) => b - a)
				.find(([b]) => Number(breakpoint) >= b)?.[1] ||
				defaultGutter ||
				1
		);
	}, [breakpoint, multiplier]);

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
				ref.current.clientWidth - gutter * (picked.length - 1);

			let combinedWidths = 0;

			if (!fill && picked.length < toPick) {
				for (let i = 0; i < toPick; i++) {
					combinedWidths += scaled[i % picked.length].width;
				}
			} else {
				combinedWidths = scaled.reduce((p, c) => p + c.width, 0);
			}

			const multiplier = combinedWidths / containerWidth;

			if (fill) {
				const combinedScaledWidths = Number(
					scaled
						.reduce((p, c) => p + c.width / multiplier, 0)
						.toFixed(2)
				);

				console.assert(
					combinedScaledWidths === containerWidth,
					`Width should be ${containerWidth}, was ${combinedScaledWidths}`
				);
			}

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
	}, [artworks, breakpoint, fill, gutter, ref, renderChild, rows]);

	return (
		<div
			ref={ref}
			className={clsx(classes["container"], className)}
			style={{ gap: gutter + "px" }}
			{...props}
		>
			{parsedArtworks}
		</div>
	);
};

export default Gallery;

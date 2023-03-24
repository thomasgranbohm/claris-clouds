import { FC } from "react";
import NextImage, {
	ImageLoader,
	ImageProps as NextImageProps,
} from "next/image";

import { Shopify } from "types/api/shopify";
import { GraphQL, ImageSchema } from "types/api/strapi";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

import classes from "./Image.module.scss";

export const NoWhitespaceImage: FC<StrapiImageProps> = ({
	style,
	...props
}) => {
	return (
		<StrapiImage {...props} style={{ ...style, verticalAlign: "bottom" }} />
	);
};

interface ShopifyImageProps extends Partial<NextImageProps> {
	aspectRatio?: [number, number]; // [width, height]
	image: Shopify.Image;
}

export const ShopifyImage: FC<ShopifyImageProps> = ({
	aspectRatio,
	fill,
	height: _height,
	image,
	width: _width,
	...props
}) => {
	const { altText, height, preview_url, url, width } = image;

	const ShopifyImageLoader: ImageLoader = ({ src, width: newWidth }) => {
		const url = new URL(src);

		if (aspectRatio && image.width && image.height) {
			const [aW, aH] = aspectRatio;
			const newHeight = (newWidth / aW) * aH;

			url.searchParams.append("crop", "center");
			url.searchParams.append("height", Number(newHeight).toString());
			url.searchParams.append("width", Number(newWidth).toString());
		} else {
			url.searchParams.append("width", Number(newWidth).toString());
		}

		return url.toString();
	};

	const blurProps: Pick<NextImageProps, "placeholder" | "blurDataURL"> = {
		blurDataURL: preview_url ?? undefined,
		placeholder: preview_url ? "blur" : "empty",
	};

	return (
		<div className={classes["shopify"]}>
			<NextImage
				width={width || 1}
				height={height || 1}
				{...props}
				{...blurProps}
				loader={ShopifyImageLoader}
				src={url}
				alt={altText || ""}
				fill={fill}
			/>
		</div>
	);
};

interface StrapiImageProps extends Partial<NextImageProps> {
	blur?: boolean;
	image: ImageSchema | GraphQL.Data<ImageSchema>;
}

export const StrapiImage: FC<StrapiImageProps> = ({
	blur = true,
	fill,
	image,
	...props
}) => {
	const { alternativeText, ext, formats, hash, height, name, width } =
		"data" in image ? stripWrapper(image) : image;

	if (blur) {
		console.assert(
			Boolean(formats.base64),
			`%s does not have Base64 image`,
			name
		);
	}

	return (
		<NextImage
			{...props}
			height={!fill ? height : undefined}
			width={!fill ? width : undefined}
			fill={fill}
			alt={alternativeText || ""}
			src={getImageLink({ ext, hash })}
			blurDataURL={
				blur && formats.base64 ? formats.base64.url : undefined
			}
			placeholder={blur && formats.base64 ? "blur" : undefined}
		/>
	);
};

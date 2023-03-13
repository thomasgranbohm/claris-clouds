import { FC } from "react";
import NextImage, {
	ImageLoader,
	ImageProps as NextImageProps,
} from "next/image";

import { Shopify } from "types/api/shopify";
import { GraphQL, ImageSchema } from "types/api/strapi";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

export const NoWhitespaceImage: FC<StrapiImageProps> = ({
	style,
	...props
}) => {
	return (
		<StrapiImage {...props} style={{ ...style, verticalAlign: "bottom" }} />
	);
};

interface ShopifyImageProps extends Partial<NextImageProps> {
	image: Shopify.Image;
}

export const ShopifyImage: FC<ShopifyImageProps> = ({
	fill,
	height: _height,
	image,
	width: _width,
	...props
}) => {
	const { altText, height, preview_url, url, width } = image;

	return (
		<NextImage
			width={width || 1}
			height={height || 1}
			{...props}
			src={url}
			alt={altText || ""}
			fill={fill}
			placeholder="blur"
			blurDataURL={`/_next/image?url=${preview_url}&w=16&q=1`}
		/>
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

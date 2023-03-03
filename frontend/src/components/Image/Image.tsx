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

const ShopifyImageLoader: ImageLoader = ({ quality, src, width }) => {
	const url = new URL(src);

	url.searchParams.append("width", width.toString());

	if (quality) {
		url.searchParams.append("quality", quality.toString());
	}

	return url.toString();
};

export const ShopifyImage: FC<ShopifyImageProps> = ({ image, ...props }) => {
	const { altText, height, url, width } = image;

	return (
		<NextImage
			width={width}
			height={height}
			{...props}
			loader={ShopifyImageLoader}
			src={url}
			alt={altText || ""}
			placeholder="blur"
			blurDataURL={ShopifyImageLoader({ src: url, width: 64 })}
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

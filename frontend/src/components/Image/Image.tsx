import { FC } from "react";
import clsx from "clsx";
import NextImage, { ImageProps as NextImageProps } from "next/image";

import { GraphQL, ImageSchema } from "types/api/strapi";
import { WithClassname } from "types/components";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

import classes from "./Image.module.scss";

interface StrapiImageProps extends Partial<NextImageProps> {
	blur?: true;
	image: ImageSchema | GraphQL.Data<ImageSchema>;
}

// TODO: Need to upgrade to next/image 13

export const StrapiImage: FC<StrapiImageProps> = ({
	blur,
	fill,
	image,
	...props
}) => {
	const {
		alternativeText,
		caption,
		ext,
		formats,
		hash,
		height,
		name,
		width,
	} = "data" in image ? stripWrapper(image) : image;

	const placeholderProps: Partial<NextImageProps> =
		Boolean(blur) && formats.base64
			? {
					blurDataURL: formats.base64.url,
					loading: "lazy",
					placeholder: "blur",
			  }
			: {};

	return (
		<Image
			{...props}
			{...placeholderProps}
			height={!fill ? height : undefined}
			width={!fill ? width : undefined}
			fill={fill}
			alt={caption || alternativeText || name}
			src={getImageLink({ ext, hash })}
		/>
	);
};

interface ImageProps extends WithClassname {
	alt: string;
	height?: number;
	src: string;
	width?: number;
}

const Image: FC<ImageProps & NextImageProps> = ({
	alt,
	height,
	src,
	width,
	...props
}) => {
	return (
		<NextImage
			{...props}
			alt={alt}
			height={height}
			src={src}
			width={width}
		/>
	);
};

export default Image;

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

export const StrapiImage: FC<StrapiImageProps> = ({
	blur,
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
			alt={caption || alternativeText || name}
			height={height}
			src={getImageLink({ ext, hash })}
			width={width}
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
	className,
	height,
	layout = "intrinsic",
	src,
	width,
	...props
}) => {
	return (
		<div
			className={clsx(
				classes["container"],
				layout && classes[`layout--${layout}`],
				className
			)}
		>
			<NextImage
				{...props}
				alt={alt}
				height={height}
				layout={layout}
				src={src}
				width={width}
			/>
		</div>
	);
};

export default Image;

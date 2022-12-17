import { FC } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

import { GraphQL, ImageSchema } from "types/api/strapi";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

interface StrapiImageProps extends Partial<NextImageProps> {
	blur?: true;
	image: ImageSchema | GraphQL.Data<ImageSchema>;
}

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

	const placeholderProps: Partial<NextImageProps> = Boolean(blur)
		? {
				blurDataURL: getImageLink(
					formats.base64 ?? formats.thumbnail ?? formats.small
				),
				loading: "lazy",
				placeholder: "blur",
		  }
		: {};

	return (
		<NextImage
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

export default StrapiImage;

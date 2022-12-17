import { FC } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

import { GraphQL, ImageSchema } from "types/api/strapi";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

interface StrapiImageProps extends Partial<NextImageProps> {
	image: ImageSchema | GraphQL.Data<ImageSchema>;
}

export const StrapiImage: FC<StrapiImageProps> = ({
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

	return (
		<NextImage
			height={!fill ? height : undefined}
			width={!fill ? width : undefined}
			fill={fill}
			alt={caption || alternativeText || name}
			src={getImageLink({ ext, hash })}
			sizes="(max-width: 768px) 100vw,
			(max-width: 1200px) 50vw,
			33vw"
			blurDataURL={formats.base64?.url}
			placeholder={formats.base64 && "blur"}
			{...props}
		/>
	);
};

export default StrapiImage;

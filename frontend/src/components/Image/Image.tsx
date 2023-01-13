import { FC } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

import { GraphQL, ImageSchema } from "types/api/strapi";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

export const NoWhitespaceImage: FC<StrapiImageProps> = ({
	className,
	style,
	...props
}) => {
	return (
		<div className={className} style={{ fontSize: 0 }}>
			<StrapiImage {...props} style={{ ...style, fontSize: "initial" }} />
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
			alt={alternativeText || ""}
			src={getImageLink({ ext, hash })}
			blurDataURL={blur ? formats.base64?.url : undefined}
			placeholder={blur && formats.base64 ? "blur" : undefined}
			{...props}
		/>
	);
};

export default StrapiImage;

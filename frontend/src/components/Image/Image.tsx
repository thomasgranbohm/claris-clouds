import { FC } from "react";
import clsx from "clsx";
import NextImage from "next/image";

import classes from "./Image.module.scss";

interface ImageProps {
	alt: string;
	height?: number;
	layout?: "fill" | "intrinsic" | "responsive";
	src: string;
	width?: number;
}

const Image: FC<ImageProps> = ({ alt, height, layout, src, width }) => {
	return (
		<div
			className={clsx(
				classes["container"],
				layout && classes[`layout--${layout}`]
			)}
		>
			<NextImage
				alt={alt}
				height={height}
				layout="intrinsic"
				src={`/api/image?src=${src}`}
				width={width}
				placeholder="blur"
				blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
				objectPosition="center"
				objectFit="cover"
			/>
		</div>
	);
};

export default Image;

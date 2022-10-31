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

const Image: FC<ImageProps> = ({
	alt,
	height,
	layout = "intrinsic",
	src,
	width,
}) => {
	const url = `/api/image/${src}`;

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
				layout={layout}
				src={url}
				width={width}
			/>
		</div>
	);
};

export default Image;

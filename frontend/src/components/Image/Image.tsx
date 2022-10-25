import { FC } from "react";
import clsx from "clsx";
import NextImage from "next/image";

import classes from "./Image.module.scss";

interface ImageProps {
	alt: string;
	layout?: "fill" | "intrinsic" | "responsive";
	height?: number;
	src: string;
	width?: number;
}

const Image: FC<ImageProps> = ({ alt, src, height, layout, width }) => {
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
				src={src}
				width={width}
			/>
		</div>
	);
};

export default Image;

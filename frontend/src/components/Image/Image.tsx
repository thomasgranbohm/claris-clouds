import { FC } from "react";
import clsx from "clsx";
import NextImage, { ImageProps as NextImageProps } from "next/image";

import { WithClassname } from "types/components";

import classes from "./Image.module.scss";

interface ImageProps extends WithClassname, NextImageProps {
	alt: string;
	height?: number;
	layout?: "fill" | "intrinsic" | "responsive";
	src: string;
	width?: number;
}

const Image: FC<ImageProps> = ({
	alt,
	className,
	height,
	layout = "intrinsic",
	src,
	width,
	...props
}) => {
	const url = `/api/image/${src}`;

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
				src={url}
				width={width}
			/>
		</div>
	);
};

export default Image;

import { FC } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { NextSeo, NextSeoProps } from "next-seo";

import { ImageFormat, ImageSchema } from "types/api/strapi";

import getImageLink from "utils/getImageLink";

interface MetaDataProps extends NextSeoProps {
	description?: string;
	image?: ImageSchema;
	path?: string;
	title: string;
}

const MetaData: FC<MetaDataProps> = ({
	canonical,
	description,
	image,
	path,
	title,
	...props
}) => {
	const router = useRouter();
	const { publicRuntimeConfig } = getConfig();

	return (
		<NextSeo
			{...props}
			title={title}
			description={description}
			canonical={
				canonical ||
				publicRuntimeConfig.PAGE_URL + (path || router.asPath)
			}
			openGraph={{
				type: "website",
				...props.openGraph,
				description,
				images: image
					? [
							{
								alt: image.alternativeText,
								height: image.height,
								url:
									publicRuntimeConfig.PAGE_URL +
									getImageLink(image),
								width: image.width,
							},
							...Object.entries(image.formats)
								.reduce<ImageFormat[]>(
									(p, c) =>
										c[0] !== "base64" ? [...p, c[1]] : p,
									[]
								)
								.map(({ height, width, ...i }) => ({
									alt: image.alternativeText,
									height,
									url:
										publicRuntimeConfig.PAGE_URL +
										getImageLink(i),
									width,
								})),
					  ]
					: [],
				title,
			}}
		/>
	);
};

export default MetaData;

import { FC } from "react";
import { Image } from "@shopify/hydrogen-react/storefront-api-types";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { NextSeo, NextSeoProps } from "next-seo";

import { GraphQL, ImageSchema } from "types/api/strapi";
import { ImageFormat as StrapiImageFormat } from "types/api/strapi";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

const { publicRuntimeConfig } = getConfig();

export const StrapiMetadata: FC<
	{ image?: GraphQL.Data<ImageSchema> | null } & MetaDataProps
> = ({ image: _image, openGraph, ...props }) => {
	const image =
		_image !== undefined && _image !== null
			? stripWrapper(_image)
			: undefined;

	return (
		<MetaData
			{...props}
			openGraph={{
				...openGraph,
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
								.reduce<StrapiImageFormat[]>(
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
			}}
		/>
	);
};

export const ShopifyMetadata: FC<{ image?: Image } & MetaDataProps> = ({
	image,
	openGraph,
	...props
}) => {
	return (
		<MetaData
			{...props}
			openGraph={{
				...openGraph,
				images: image ? [image] : [],
			}}
		/>
	);
};

interface MetaDataProps extends NextSeoProps {
	description?: string;
	path?: string;
	title?: string;
}

const MetaData: FC<MetaDataProps> = ({
	canonical,
	description,
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
				title,
			}}
		/>
	);
};

export default MetaData;

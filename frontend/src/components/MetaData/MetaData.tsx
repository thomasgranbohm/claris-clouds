import { FC } from "react";
import { Image } from "@shopify/hydrogen-react/storefront-api-types";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { NextSeo, NextSeoProps } from "next-seo";

import { GraphQL, ImageSchema } from "types/api/strapi";

import getImageLink from "utils/getImageLink";
import stripWrapper from "utils/stripWrapper";

interface MetaDataProps extends NextSeoProps {
	description?: string;
	images?: Array<Image | GraphQL.Data<ImageSchema> | undefined>;
	path?: string;
	title?: string;
}

const MetaData: FC<MetaDataProps> = ({
	canonical,
	description,
	images,
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
				images: (images || []).reduce<ImageFormat[]>((p, image) => {
					if (!image) {
						return p;
					}

					if ("data" in image) {
						const a = stripWrapper(image);

						return [
							...p,
							{
								...a,
								url: getImageLink(a),
							},
							...Object.values(a.formats).map((b) => ({
								...b,
								url: getImageLink(b),
							})),
						];
					}

					return [...p, image];
				}, []),
				title,
			}}
		/>
	);
};

export default MetaData;

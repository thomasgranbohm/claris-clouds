import { FC } from "react";
import getConfig from "next/config";
import { NextSeo, NextSeoProps } from "next-seo";

import classes from "./MetaData.module.scss";

interface MetaDataProps {
	description?: string;
	images: Array<{
		alt: string;
		height: number;
		url: string;
		width: number;
	}>;
	path: string;
	title: string;
}

const MetaData: FC<MetaDataProps> = ({ description, images, path, title }) => {
	const { publicRuntimeConfig } = getConfig();

	return (
		<NextSeo
			title={title}
			description={description}
			canonical={publicRuntimeConfig.PAGE_URL + path}
			openGraph={{
				description,
				images: images.map(({ url, ...rest }) => ({
					...rest,
					url: `${publicRuntimeConfig.PAGE_URL}/api/image?src=${url}`,
				})),
				title,
				type: "website",
			}}
		/>
	);
};

export default MetaData;

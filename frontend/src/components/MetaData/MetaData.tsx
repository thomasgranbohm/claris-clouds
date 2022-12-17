import { FC } from "react";
import getConfig from "next/config";
import { NextSeo, NextSeoProps } from "next-seo";

interface MetaDataProps extends NextSeoProps {
	description?: string;
	images?: Array<{
		alt: string;
		height: number;
		url: string;
		width: number;
	}>;
	path: string;
	title: string;
}

const MetaData: FC<MetaDataProps> = ({
	canonical,
	description,
	images,
	path,
	title,
	...props
}) => {
	const { publicRuntimeConfig } = getConfig();

	return (
		<NextSeo
			{...props}
			title={title}
			description={description}
			canonical={canonical || publicRuntimeConfig.PAGE_URL + path}
			openGraph={{
				description,
				images:
					images &&
					images.map(({ url, ...rest }) => ({
						...rest,
						url: `${publicRuntimeConfig.PAGE_URL}${url}`,
					})),
				title,
				type: "website",
			}}
		/>
	);
};

export default MetaData;

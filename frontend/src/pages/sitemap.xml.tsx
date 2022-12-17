import { GetServerSideProps } from "next";
import getConfig from "next/config";

import { getArtworkSlugs } from "api/artwork";

import stripWrapper from "utils/stripWrapper";

const { publicRuntimeConfig } = getConfig();

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { data, error } = await getArtworkSlugs();

	if (error) {
		throw error;
	}

	const artworks = stripWrapper(data.artworks);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
	<loc>${publicRuntimeConfig.PAGE_URL}</loc>
</url>
<url>
	<loc>${publicRuntimeConfig.PAGE_URL}/gallery</loc>
</url>
	${artworks
		.map(
			({ slug }) =>
				`<url><loc>${`${publicRuntimeConfig.PAGE_URL}/artwork/${slug}`}</loc></url>`
		)
		.join("\n")}
</urlset>`;

	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
};

const Sitemap = () => void 0;

export default Sitemap;

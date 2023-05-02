import { GetServerSideProps } from "next";
import getConfig from "next/config";

import { getPageSlugs } from "api/page";
import { getProductHandles } from "api/product";

import stripWrapper from "utils/stripWrapper";

const { publicRuntimeConfig } = getConfig();

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const pages = await (async () => {
		const { data, error } = await getPageSlugs();

		if (error) {
			throw error;
		}

		return stripWrapper(data.pages);
	})();

	const { data } = await getProductHandles();

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
	<loc>${publicRuntimeConfig.PAGE_URL}</loc>
</url>
<url>
	<loc>${publicRuntimeConfig.PAGE_URL}/shop</loc>
</url>
	${pages
		.map(
			({ slug }) =>
				`<url><loc>${`${publicRuntimeConfig.PAGE_URL}/${slug}`}</loc></url>`
		)
		.join("\n")}
	${data.data.products.edges.map(
		({ node }) =>
			`<url><loc>${publicRuntimeConfig.PAGE_URL}/artwork/${node.handle}</loc><lastmod>${node.updatedAt}</lastmod></url>`
	)}
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

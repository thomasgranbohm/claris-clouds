import { GetServerSideProps } from "next";
import getConfig from "next/config";

// import { getArtworkSlugs } from "api/artwork";
// import { getPageSlugs } from "api/page";

// import stripWrapper from "utils/stripWrapper";

const { publicRuntimeConfig } = getConfig();

// export const getServerSideProps: GetServerSideProps = async ({ res }) => {
// 	const [artworks, pages] = await Promise.all([
// 		(async () => {
// 			const { data, error } = await getArtworkSlugs();

// 			if (error) {
// 				throw error;
// 			}

// 			return stripWrapper(data.artworks);
// 		})(),
// 		(async () => {
// 			const { data, error } = await getPageSlugs();

// 			if (error) {
// 				throw error;
// 			}

// 			return stripWrapper(data.pages);
// 		})(),
// 	]);

// 	const genXMLBlock =
// 		<T extends { slug: string }>(prefix?: string) =>
// 		({ slug }: T) =>
// 			`<url><loc>${`${publicRuntimeConfig.PAGE_URL}/${
// 				prefix ? `${prefix}/` : ""
// 			}${slug}`}</loc></url>`;

// 	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// <url>
// 	<loc>${publicRuntimeConfig.PAGE_URL}</loc>
// </url>
// <url>
// 	<loc>${publicRuntimeConfig.PAGE_URL}/shop</loc>
// </url>
// 	${artworks.map(genXMLBlock("artwork")).join("\n")}
// 	${pages.map(genXMLBlock()).join("\n")}
// </urlset>`;

// 	res.setHeader("Content-Type", "text/xml");
// 	res.write(sitemap);
// 	res.end();

// 	return {
// 		props: {},
// 	};
// };

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${publicRuntimeConfig.PAGE_URL}</loc>
	</url>
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

import { GetServerSideProps } from "next";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const robots = `User-agent: *
Allow: /

Sitemap: ${publicRuntimeConfig.PAGE_URL}/sitemap.xml`;

	res.setHeader("Content-Type", "text/plain");
	res.write(robots);
	res.end();

	return {
		props: {},
	};
};

const Robots = () => void 0;

export default Robots;

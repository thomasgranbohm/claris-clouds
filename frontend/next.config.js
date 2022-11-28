/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placekitten.com",
			},
			{
				hostname: "backend",
			},
			{
				hostname: "localhost",
			},
		],
	},
	output: process.env.NODE_ENV === "production" && "standalone",
	async rewrites() {
		return [
			{
				source: "/api/image/:name([a-zA-Z0-9\\_\\-\\.]+)",
				destination:
					this.serverRuntimeConfig.API_URL + "/uploads/:name",
			},
		];
	},
	async redirects() {
		return [
			{
				destination: "/gallery",
				source: "/artworks",
				permanent: true,
			},
			{
				destination: "/gallery",
				source: "/artwork",
				permanent: true,
			},
		];
	},
	publicRuntimeConfig: {
		API_URL: process.env.EXTERNAL_API_URL,
		PAGE_URL: process.env.PAGE_URL,
	},
	reactStrictMode: true,
	swcMinify: true,
	serverRuntimeConfig: {
		API_URL: process.env.INTERNAL_API_URL,
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(
			(rule) => rule.test && rule.test.test(".svg")
		);

		if (fileLoaderRule) {
			fileLoaderRule.exclude = /\.svg$/;
		}

		config.module.rules = [
			...config.module.rules,
			{
				resourceQuery: /url/,
				test: /\.svg$/i,
				type: "asset", // *.svg?url
			},
			{
				issuer: /\.[jt]sx?$/,
				resourceQuery: { not: [/url/] },
				test: /\.svg$/i, // exclude react component if *.svg?url
				use: ["@svgr/webpack"],
			},
		];

		return config;
	},
};

module.exports = nextConfig;

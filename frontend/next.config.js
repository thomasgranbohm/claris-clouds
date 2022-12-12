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
	output:
		(process.env.NODE_ENV === "production" && "standalone") || undefined,
	async rewrites() {
		return [
			{
				source: "/api/image/:name([a-zA-Z0-9\\_\\-\\.]+)",
				destination:
					this.serverRuntimeConfig.API_URL + "/uploads/:name",
			},
		];
	},
	reactStrictMode: false,
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
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ["@svgr/webpack"],
			},
			{
				resourceQuery: /url/,
				test: /\.svg$/i,
				type: "asset", // *.svg?url
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				use: [{ loader: "graphql-tag/loader" }],
			},
		];

		return config;
	},
};

module.exports = nextConfig;

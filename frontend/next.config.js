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
	async rewrites() {
		return [
			{
				source: "/api/image/:name([a-zA-Z0-9\\_\\-\\.]+)",
				destination:
					this.serverRuntimeConfig.API_URL + "/uploads/:name",
			},
		];
	},
	publicRuntimeConfig: {
		PAGE_URL: process.env.PAGE_URL,
	},
	reactStrictMode: true,
	swcMinify: true,
	serverRuntimeConfig: {
		API_URL: process.env.API_URL,
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

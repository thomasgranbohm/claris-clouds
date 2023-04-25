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
				hostname: new URL(process.env.PAGE_URL).hostname,
			},
			{
				hostname: "cdn.shopify.com",
				protocol: "https",
			},
		],
		minimumCacheTTL: 60,
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
			{
				source: "/api/graphql",
				destination: this.serverRuntimeConfig.API_URL + "/graphql",
			},
		];
	},
	reactStrictMode: false,
	async redirects() {
		return [
			{
				destination: "/shop",
				source: "/artworks",
				permanent: true,
			},
			{
				destination: "/shop",
				source: "/artwork",
				permanent: true,
			},
			{
				destination: "/artwork/:name",
				source: "/product/:name([a-zA-Z\\-\\_]+)",
				permanent: true,
			},
		];
	},
	publicRuntimeConfig: {
		API_URL: process.env.EXTERNAL_API_URL,
		GTM_AUTH: process.env.GTM_AUTH,
		GTM_ENV: process.env.GTM_ENV,
		GTM_ID: process.env.GTM_ID,
		PAGE_URL: process.env.PAGE_URL,
		HTTP_AUTH: process.env.HTTP_AUTH,
		SHOPIFY_URL: process.env.SHOPIFY_URL,
		SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
		SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
		SHOPIFY_STOREFRONT_TOKEN:
			process.env.SHOPIFY_STOREFRONT_PUBLIC_ACCESS_TOKEN,
		SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,
	},
	reactStrictMode: false,
	swcMinify: true,
	serverRuntimeConfig: {
		API_URL: process.env.INTERNAL_API_URL,
		SHOPIFY_URL: process.env.SHOPIFY_URL,
		SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
		SHOPIFY_STOREFRONT_TOKEN:
			process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN,
		SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
		SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,
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

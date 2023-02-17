import { Fragment, useEffect, useState } from "react";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { getArtwork, getArtworkSlugs } from "api/artwork";
import requestShopify from "api/shopify";

import ArtworkLink from "components/ArtworkLink";
import ComponentRenderer from "components/ComponentRenderer";
import Gallery from "components/Gallery";
import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import Icon from "components/Icon";
import { NoWhitespaceImage, ShopifyImage } from "components/Image";
import Labeler from "components/Labeler";
import Layout from "components/Layout";
import Link, { StyledLink } from "components/Link";
import MetaData from "components/MetaData";
import Typography from "components/Typography";

import ProductByHandle from "queries/shopify/ProductByHandle.gql";

import classes from "styles/pages/ProductPage.module.scss";

import ArtworkSchema, { ArtworkPageSchema } from "types/api/artwork";
import { Shopify } from "types/api/shopify";
import { LayoutPage } from "types/components";

import generateImageBreakpoints from "utils/generateImageBreakpoints";
import { getLayoutDataSSG } from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getStaticProps = getLayoutDataSSG<ProductPageProps>(
	async ({ params }) => {
		const slug = params?.["slug"];

		if (!slug) {
			return {
				notFound: true,
			};
		}

		const resp = await requestShopify<{
			productByHandle: Shopify.Data<Shopify.Product>;
		}>(ProductByHandle, { handle: slug });

		return {
			props: { product: resp.data.productByHandle },
		};
	}
);

export const getStaticPaths: GetStaticPaths = async () => {
	if (process.env.NODE_ENV !== "production") {
		return { fallback: "blocking", paths: [] };
	}

	const { data } = await getArtworkSlugs();

	return {
		fallback: "blocking",
		paths: stripWrapper(data.artworks).map((p) => ({
			params: { slug: p.slug },
		})),
	};
};

interface ProductPageProps {
	product: Shopify.Product;
}

const ArtworkPage: LayoutPage<ProductPageProps> = ({ layout, product }) => {
	const { asPath } = useRouter();
	const { description, featuredImage, title } = product;

	return (
		<Layout {...layout}>
			<Row>
				<Column md={6}>
					<ShopifyImage
						image={featuredImage}
						style={{
							aspectRatio: "1 / 1",
							height: "auto",
							maxWidth: "100%",
							objectFit: "contain",
						}}
					/>
				</Column>
				<Column md={6} align="end">
					<Heading type="h1">{title}</Heading>
					<Typography>{description}</Typography>
				</Column>
			</Row>
			<pre>
				<code>{JSON.stringify(product, null, 4)}</code>
			</pre>
		</Layout>
	);
};

export default ArtworkPage;

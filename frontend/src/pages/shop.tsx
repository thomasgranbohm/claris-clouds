import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import axios from "axios";
import { print } from "graphql";
import { NextPage } from "next";

import { getPrivateTokenHeaders, getStorefrontApiUrl } from "api/shopify";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import HtmlRenderer from "components/HtmlRenderer";
import { ShopifyImage } from "components/Image";
import Layout from "components/Layout";
import { StyledLink } from "components/Link";

import ProductsQuery from "queries/shopify/Products.gql";

import { Responses, Shopify } from "types/api/shopify";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG<ShopPageProps>(async () => {
	try {
		const { data } = await axios.post<{
			data: Responses.GetProductPreviews;
		}>(
			getStorefrontApiUrl(),
			{
				query: print(ProductsQuery),
			},
			{
				headers: getPrivateTokenHeaders({
					contentType: "json",
				}),
			}
		);

		return {
			props: { products: data.data.products },
		};
	} catch (error) {
		throw error;
	}
});

interface ShopPageProps {
	products: Shopify.Data<Product[]>;
}

const ShopPage: NextPage<ShopPageProps> = ({ products }) => {
	return (
		<Layout>
			{products.edges.map(({ node: product }, i) => (
				<Row key={product.id} reverse={i % 2 === 1}>
					<Column md={6} lg={[5, i % 2 === 0 ? 1 : 0]} align="center">
						{product.featuredImage && (
							// eslint-disable-next-line jsx-a11y/alt-text
							<ShopifyImage
								image={product.featuredImage}
								style={{
									height: "auto",
									maxWidth: "100%",
									objectFit: "cover",
									verticalAlign: "bottom",
									width: "100%",
								}}
							/>
						)}
					</Column>
					<Column md={6} lg={[5, i % 2 === 1 ? 1 : 0]} align="center">
						<Heading type="h2">{product.title}</Heading>
						{product.descriptionHtml && (
							<HtmlRenderer content={product.descriptionHtml} />
						)}
						<Row>
							<Column lg={6}>
								<StyledLink href={`/artwork/${product.handle}`}>
									Buy a print
								</StyledLink>
							</Column>
						</Row>
					</Column>
				</Row>
			))}
		</Layout>
	);
};

export default ShopPage;

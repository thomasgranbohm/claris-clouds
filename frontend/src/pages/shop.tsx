import { Item } from "react-stately";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { NextPage } from "next";

import { getProductPreviews } from "api/product";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import HtmlRenderer from "components/HtmlRenderer";
import { ShopifyImage } from "components/Image";
import Layout from "components/Layout";
import { StyledLink } from "components/Link";
import MetaData from "components/MetaData";
import Tabs from "components/Tabs";

import { Shopify } from "types/api/shopify";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG<ShopPageProps>(async () => {
	try {
		const { data } = await getProductPreviews();

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
			<MetaData
				title="Shop"
				description="This is the shop page where you can by my artworks."
			/>
			<Tabs>
				{Object.entries<Array<Product>>(
					products.edges.reduce<Record<string, Array<Product>>>(
						(p, { node: product }) => {
							const { productType } = product;
							const type = productType.endsWith("y")
								? productType.substring(
										0,
										productType.length - 2
								  ) + "ies"
								: !productType.endsWith("s")
								? productType + "s"
								: productType;

							if (type in p) {
								p[type].push(product);
							} else {
								p[type] = [product];
							}

							return p;
						},
						{}
					)
				).map(([key, products]) => (
					<Item key={key} title={key}>
						{products.map((product) => (
							<Row key={product.id}>
								<Column md={6} lg={[4, 2]} align="center">
									{product.featuredImage && (
										// eslint-disable-next-line jsx-a11y/alt-text
										<ShopifyImage
											image={product.featuredImage}
											aspectRatio={[1, 1]}
											sizes="(min-width: 960px) 640px, (min-width: 768px) 750px, (min-width: 480px) 640px"
											style={{
												aspectRatio: "1 / 1",
												height: "auto",
												maxWidth: "100%",
												objectFit: "cover",
												verticalAlign: "bottom",
												width: "100%",
											}}
										/>
									)}
								</Column>
								<Column md={6} lg={4} align="center">
									<Heading type="h2">{product.title}</Heading>
									{product.descriptionHtml && (
										<HtmlRenderer
											content={product.descriptionHtml}
										/>
									)}
									<Row>
										<Column lg={8}>
											<StyledLink
												href={`/artwork/${product.handle}`}
											>
												Purchase
											</StyledLink>
										</Column>
									</Row>
								</Column>
							</Row>
						))}
					</Item>
				))}
			</Tabs>
		</Layout>
	);
};

export default ShopPage;

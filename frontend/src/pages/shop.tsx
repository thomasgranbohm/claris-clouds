import requestShopify from "api/shopify";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import { ShopifyImage } from "components/Image";
import Layout from "components/Layout";
import Link from "components/Link";
import Typography from "components/Typography";

import ProductsQuery from "queries/shopify/Products.gql";

import { Shopify } from "types/api/shopify";
import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG<ShopPageProps>(async () => {
	const resp = await requestShopify<{
		products: Shopify.Data<Shopify.Product[]>;
	}>(ProductsQuery);

	return { props: resp.data };
});

interface ShopPageProps {
	products: Shopify.Data<Shopify.Product[]>;
}

const Shop: LayoutPage<ShopPageProps> = ({ layout, products }) => {
	return (
		<Layout {...layout}>
			<Row>
				{products.edges.map(({ node: product }) => (
					<Column key={product.id} md={3}>
						<Link href={`/product/${product.handle}`}>
							<ShopifyImage
								image={product.featuredImage}
								style={{
									aspectRatio: "1 / 1",
									height: "auto",
									maxWidth: "100%",
									objectFit: "cover",
									verticalAlign: "bottom",
								}}
							/>
							<Typography color="gray">
								{product.title}
							</Typography>
						</Link>
					</Column>
				))}
			</Row>
		</Layout>
	);
};

export default Shop;

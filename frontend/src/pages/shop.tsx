import { Product } from "shopify-buy";

import requestShopify from "api/shopify";

import Column from "components/Column";
import Heading from "components/Heading";
import Layout from "components/Layout";
import Row from "components/Row";

import ProductsQuery from "queries/shopify/Products.gql";

import { Shopify } from "types/api/shopify";
import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG<ShopPageProps>(async () => {
	const resp = await requestShopify<{ products: Shopify.Data<Product[]> }>(
		ProductsQuery
	);

	return { props: resp.data };
});

interface ShopPageProps {
	products: Shopify.Data<Product[]>;
}

const Shop: LayoutPage<ShopPageProps> = ({ layout, products }) => {
	return (
		<Layout {...layout}>
			<Row>
				{products.edges.map(({ node: product }) => (
					<Column key={product.id}>
						<Heading type="h3">{product.title}</Heading>
					</Column>
				))}
			</Row>
			<pre>
				<code>{JSON.stringify(products.edges, null, 4)}</code>
			</pre>
		</Layout>
	);
};

export default Shop;

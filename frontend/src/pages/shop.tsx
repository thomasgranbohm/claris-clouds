import requestShopify from "api/shopify";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import { ShopifyImage } from "components/Image";
import Layout from "components/Layout";
import Link, { StyledLink } from "components/Link";
import Typography from "components/Typography";

import ProductsQuery from "queries/shopify/Products.gql";

import { Shopify } from "types/api/shopify";
import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG<ShopPageProps>(async () => {
	const resp = await requestShopify<{
		products: Shopify.Data<Shopify.ProductPreview[]>;
	}>(ProductsQuery);

	return { props: resp.data };
});

interface ShopPageProps {
	products: Shopify.Data<Shopify.ProductPreview[]>;
}

const Shop: LayoutPage<ShopPageProps> = ({ layout, products }) => {
	return (
		<Layout {...layout}>
			{products.edges.map(({ node: product }, i) => (
				<Row key={product.id} reverse={i % 2 === 1}>
					<Column md={6} lg={[5, i % 2 === 0 ? 1 : 0]} align="center">
						<ShopifyImage
							image={product.featuredImage}
							style={{
								height: "auto",
								maxWidth: "100%",
								objectFit: "contain",
								verticalAlign: "bottom",
							}}
						/>
					</Column>
					<Column md={6} lg={[5, i % 2 === 1 ? 1 : 0]} align="center">
						<Heading type="h2">{product.title}</Heading>
						<Typography>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Consectetur, recusandae quasi dolores fuga et
							voluptas obcaecati. Molestiae tempore, dolorum eum
							adipisci ex, at commodi reprehenderit, ut ratione
							iste enim repellendus!
						</Typography>
						<Row>
							<Column lg={6}>
								<StyledLink href={`/product/${product.handle}`}>
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

export default Shop;

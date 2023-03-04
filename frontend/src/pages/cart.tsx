import { useEffect, useState } from "react";
import { useCartContext } from "contexts/CartContext";

import requestShopify from "api/shopify";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import Layout from "components/Layout";
import { StyledLink } from "components/Link";
import ProductListing from "components/ProductListing";
import Typography from "components/Typography";

import GetCart from "queries/shopify/GetCart.gql";

import { Shopify } from "types/api/shopify";
import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG();

const CartPage: LayoutPage = ({ layout }) => {
	const { cartId } = useCartContext();

	const [cart, setCart] = useState<Shopify.Cart | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (cartId) {
			setLoading(true);
			requestShopify<{ cart: Shopify.Cart }>(GetCart, {
				id: cartId,
			}).then(({ data }) => {
				setCart(data.cart);
				setLoading(false);
			});
		}
	}, [cartId]);

	return (
		<Layout {...layout}>
			<Row>
				<Column>
					<Heading type="h1">Cart</Heading>
					{loading ? (
						<Typography>Loading...</Typography>
					) : cart ? (
						<ProductListing
							items={cart?.lines.edges.map(({ node }) => node)}
						/>
					) : (
						<Typography>Your cart is empty</Typography>
					)}
				</Column>
			</Row>
			{cart?.checkoutUrl && (
				<Row>
					<Column justify="end" md={[4, 8]}>
						<Typography>
							<b>Subtotal:</b>{" "}
							{Number(cart.cost.subtotalAmount.amount).toFixed(2)}{" "}
							{cart.cost.subtotalAmount.currencyCode}
						</Typography>
						<Typography size="small" color="gray">
							Tax included and shipping calculated at checkout
						</Typography>
					</Column>
				</Row>
			)}
			{cart?.checkoutUrl && (
				<Row>
					<Column justify="end" md={[4, 8]}>
						<StyledLink href={cart.checkoutUrl}>
							Checkout
						</StyledLink>
					</Column>
				</Row>
			)}
		</Layout>
	);
};

export default CartPage;

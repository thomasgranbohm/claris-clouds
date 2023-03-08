import { Fragment, useEffect } from "react";
import { useCartContext } from "contexts/CartContext";

import requestShopify from "api/shopify";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import Icon from "components/Icon";
import Layout from "components/Layout";
import { StyledLink } from "components/Link";
import MetaData from "components/MetaData";
import ProductListing from "components/ProductListing";
import Typography from "components/Typography";

import GetCartQuery from "queries/shopify/GetCart.gql";

import { Requests, Responses, Shopify } from "types/api/shopify";
import { LayoutPage } from "types/components";

import { getLayoutDataSSR } from "utils/getLayoutData";
import parsePrice from "utils/parsePrice";

export const getServerSideProps = getLayoutDataSSR<CartPageProps>(
	async ({ req }) => {
		const cartId = req.cookies["cart-id"];

		if (cartId) {
			const { data } = await requestShopify<
				Responses.GetCart,
				Requests.GetCart
			>(GetCartQuery, { id: cartId });

			return {
				props: { cart: data.cart },
			};
		}

		return {
			props: {},
		};
	}
);

interface CartPageProps {
	cart?: Shopify.Cart;
}

const CartPage: LayoutPage<CartPageProps> = ({
	campaign,
	cart: _cart,
	layout,
}) => {
	const { cart, setCart, totalQuantity, updating } = useCartContext();

	useEffect(() => {
		if (_cart) {
			setCart(_cart);
		}
	}, [setCart, _cart]);

	return (
		<Layout campaign={campaign} {...layout}>
			<MetaData noindex title="Cart" />
			<Row>
				<Column>
					<Heading type="h1">Cart</Heading>
					<ProductListing />
				</Column>
			</Row>
			{totalQuantity > 0 && (
				<Fragment>
					{cart?.checkoutUrl && (
						<Row>
							<Column justify="end" md={[4, 8]}>
								<Typography>
									<b>Subtotal:</b>{" "}
									{parsePrice(cart.cost.subtotalAmount)}
								</Typography>
								<Typography size="small" color="gray">
									Tax included and shipping calculated at
									checkout
								</Typography>
							</Column>
						</Row>
					)}
					{cart?.checkoutUrl && (
						<Row>
							<Column justify="end" md={[4, 8]}>
								<StyledLink
									href={cart.checkoutUrl}
									isDisabled={updating}
								>
									{updating ? (
										<Fragment>
											<Icon
												style={{
													aspectRatio: "1 / 1",
													width: "2rem",
												}}
												variant="spinner-animated"
											/>{" "}
											Loading...
										</Fragment>
									) : (
										"Checkout"
									)}
								</StyledLink>
							</Column>
						</Row>
					)}
				</Fragment>
			)}
		</Layout>
	);
};

export default CartPage;

import { Fragment, useEffect, useState } from "react";
import { Money, useCart } from "@shopify/hydrogen-react";
import { NextPage } from "next";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import Icon from "components/Icon";
import Layout from "components/Layout";
import Link, { StyledLink } from "components/Link";
import MetaData from "components/MetaData";
import ProductListing from "components/ProductListing";
import Typography from "components/Typography";

import triggerEcommerceEvent from "hooks/triggerEcommerceEvent";

import { getLayoutDataSSR } from "utils/getLayoutData";

export const getServerSideProps = getLayoutDataSSR();

const CartPage: NextPage = () => {
	const { checkoutUrl, cost, lines, status, totalQuantity } = useCart();
	const [sent, hasSent] = useState<boolean>(false);

	useEffect(() => {
		if (!sent && lines && cost && cost.subtotalAmount) {
			triggerEcommerceEvent("view_cart", {
				currency: cost.subtotalAmount.currencyCode,
				items: lines.reduce<Array<unknown>>((arr, item) => {
					if (item && item.merchandise) {
						return [
							...arr,
							{
								item_id: item.merchandise.id,
								item_name: item.merchandise.title,
								price: Number(item.merchandise.price?.amount),
								quantity: item.quantity,
							},
						];
					}

					return arr;
				}, []),
				value: Number(cost.subtotalAmount.amount),
			});

			hasSent(true);
		}
	}, [cost, lines, sent]);

	return (
		<Layout>
			<MetaData noindex title="Cart" />
			<Row>
				<Column>
					<Heading type="h1">Cart</Heading>
					{status === "uninitialized" || totalQuantity === 0 ? (
						<Typography>
							Your cart is empty.{" "}
							<Link href="/shop">Go to the shop!</Link>
						</Typography>
					) : (
						<ProductListing />
					)}
				</Column>
			</Row>
			{totalQuantity > 0 && cost?.subtotalAmount && (
				<Row>
					<Column justify="end" md={[6, 6]} lg={[4, 8]}>
						<Typography>
							<b>Subtotal:</b>{" "}
							<Money data={cost.subtotalAmount} as="span" />
						</Typography>
						<Typography size="small" color="gray">
							Tax included and shipping calculated at checkout
						</Typography>
					</Column>
				</Row>
			)}
			{totalQuantity > 0 && checkoutUrl && (
				<Row>
					<Column justify="end" md={[6, 6]} lg={[4, 8]}>
						<StyledLink
							href={checkoutUrl}
							isDisabled={status !== "idle"}
							onPress={() => {
								if (cost && lines && lines.length > 0) {
									triggerEcommerceEvent("begin_checkout", {
										currency:
											cost?.subtotalAmount?.currencyCode,
										items: lines?.reduce<Array<any>>(
											(arr, item) => {
												if (item && item.merchandise) {
													return [
														...arr,
														{
															item_id:
																item.merchandise
																	.sku,
															item_name:
																item.merchandise
																	.title,
															price: Number(
																item.merchandise
																	.price
																	?.amount
															),
															quantity:
																item.quantity ||
																1,
														},
													];
												}

												return arr;
											},
											[]
										),
										value: Number(
											cost?.subtotalAmount?.amount
										),
									});
								}
							}}
						>
							{status !== "idle" ? (
								<Fragment>
									<Icon
										style={{
											aspectRatio: "1 / 1",
											marginRight: "1rem",
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
		</Layout>
	);
};

export default CartPage;

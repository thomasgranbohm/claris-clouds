import { Fragment } from "react";
import { Money, useCart } from "@shopify/hydrogen-react";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import Icon from "components/Icon";
import Layout from "components/Layout";
import Link, { StyledLink } from "components/Link";
import MetaData from "components/MetaData";
import ProductListing from "components/ProductListing";
import Typography from "components/Typography";

import { LayoutPage } from "types/components";

import { getLayoutDataSSR } from "utils/getLayoutData";

export const getServerSideProps = getLayoutDataSSR();

const CartPage: LayoutPage = ({ campaign, layout }) => {
	const { checkoutUrl, cost, status, totalQuantity } = useCart();

	return (
		<Layout campaign={campaign} {...layout}>
			<MetaData noindex title="Cart" />
			<Row>
				<Column>
					<Heading type="h1">Cart</Heading>
					{status === "uninitialized" ? (
						<Typography>
							Your cart is empty.{" "}
							<Link href="/shop">Go to the shop!</Link>
						</Typography>
					) : status !== "idle" ? (
						<Typography>Loading...</Typography>
					) : (
						<ProductListing />
					)}
				</Column>
			</Row>
			{cost?.subtotalAmount && (
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
			{checkoutUrl && (
				<Row>
					<Column justify="end" md={[6, 6]} lg={[4, 8]}>
						<StyledLink
							href={checkoutUrl}
							isDisabled={status !== "idle"}
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

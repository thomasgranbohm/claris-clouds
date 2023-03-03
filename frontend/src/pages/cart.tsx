import { useCartContext } from "contexts/CartContext";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import Layout from "components/Layout";

import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG();

const CartPage: LayoutPage = ({ layout }) => {
	const { items } = useCartContext();

	return (
		<Layout {...layout}>
			<Row>
				<Column>
					<Heading type="h1">Cart</Heading>
					{items.map(({ id, merchandiseId, quantity }) => (
						<p key={id}>
							{quantity} x {merchandiseId}
						</p>
					))}
				</Column>
			</Row>
		</Layout>
	);
};

export default CartPage;

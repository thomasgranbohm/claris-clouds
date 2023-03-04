import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

import requestShopify from "api/shopify";

import AddToCartQuery from "queries/shopify/AddToCart.gql";
import CreateCartQuery from "queries/shopify/CreateCart.gql";
import GetCartPreviewQuery from "queries/shopify/GetCartPreview.gql";

import { Shopify } from "types/api/shopify";

interface ItemSchema {
	id: string;
	merchandiseId: string; // VariantId
	quantity: number; // CartLineId
}

interface CartContextSchema {
	addToCart: (merchandiseId: string, quantity: number) => void;
	// clearCart: () => void;
	cartId: string;
	items: ItemSchema[];
	totalQuantity: number;
	// removeFromCart: (merchandiseId: string) => void;
	// updateCart: (merchandiseId: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextSchema>({
	addToCart: () => void 0,
	// clearCart: () => void 0,
	cartId: "",
	items: [],
	totalQuantity: 0,
	// removeFromCart: () => void 0,
	// updateCart: () => void 0,
});

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [cartId, setCartId] = useState<string>("");
	const [checkoutUrl, setCheckoutUrl] = useState<string>();
	const [items, setItems] = useState<ItemSchema[]>([]);
	const [totalQuantity, setTotalQuantity] = useState<number>(0);

	// Save cartId
	useEffect(() => {
		const _cartId = window.localStorage.getItem("cart-id");

		if (cartId && !_cartId) {
			window.localStorage.setItem("cart-id", cartId);
		} else if (!cartId && _cartId) {
			setCartId(_cartId);

			requestShopify<{ cart: Shopify.Cart }>(GetCartPreviewQuery, {
				id: _cartId,
			}).then(({ data }) => {
				const { lines, totalQuantity: _totalQuantity } = data.cart;

				setTotalQuantity(_totalQuantity);
				setItems(
					lines.edges.map(({ node }) => ({
						id: node.id,
						merchandiseId: node.merchandise.id,
						quantity: node.quantity,
					}))
				);
			});
		}
	}, [cartId]);

	const addToCart = async (variantId: string, quantity: number) => {
		setTotalQuantity((q) => q + quantity);

		const {
			checkoutUrl: _checkoutUrl,
			id,
			lines,
			totalQuantity: _totalQuantity,
		} = await requestShopify<
			| {
					cartLinesAdd: { cart: Shopify.Cart };
			  }
			| { cartCreate: { cart: Shopify.Cart } }
		>(
			cartId ? AddToCartQuery : CreateCartQuery,
			cartId
				? {
						cartId,
						lines: [{ merchandiseId: variantId, quantity }],
				  }
				: {
						lines: [{ merchandiseId: variantId, quantity }],
				  }
		).then(
			({ data }) =>
				("cartCreate" in data ? data.cartCreate : data["cartLinesAdd"])
					.cart
		);

		setCartId(id);

		if (checkoutUrl !== _checkoutUrl) {
			setCheckoutUrl(_checkoutUrl);
		}
		setTotalQuantity(_totalQuantity);
		if (lines.edges.length > 0) {
			setItems(
				lines.edges.map(({ node }) => ({
					id: node.id,
					merchandiseId: node.merchandise.id,
					quantity: node.quantity,
				}))
			);
		}
	};

	return (
		<CartContext.Provider
			value={{ addToCart, cartId, items, totalQuantity }}
		>
			{children}
		</CartContext.Provider>
	);
};

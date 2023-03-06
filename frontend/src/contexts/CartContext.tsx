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
import GetCartQuery from "queries/shopify/GetCart.gql";
import UpdateCartQuery from "queries/shopify/UpdateCart.gql";

import { Requests, Responses, Shopify } from "types/api/shopify";

interface ItemSchema {
	id: string; // CartLineId
	merchandiseId: string; // VariantId
	quantity: number;
}

interface CartContextSchema {
	addToCart: (merchandiseId: string, quantity: number) => void;
	// clearCart: () => void;
	cartId: string;
	items: Shopify.CartItem[];
	totalQuantity: number;
	// removeFromCart: (merchandiseId: string) => void;
	updateCart: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextSchema>({
	addToCart: () => void 0,
	// clearCart: () => void 0,
	cartId: "",
	items: [],
	totalQuantity: 0,
	// removeFromCart: () => void 0,
	updateCart: () => void 0,
});

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [cartId, setCartId] = useState<string>("");
	const [checkoutUrl, setCheckoutUrl] = useState<string>();
	const [items, setItems] = useState<Shopify.CartItem[]>([]);
	const [totalQuantity, setTotalQuantity] = useState<number>(0);

	// Save cartId
	useEffect(() => {
		const _cartId = window.localStorage.getItem("cart-id");

		if (cartId && !_cartId) {
			window.localStorage.setItem("cart-id", cartId);
		} else if (!cartId && _cartId) {
			setCartId(_cartId);

			requestShopify<Responses.GetCart, Requests.GetCart>(GetCartQuery, {
				id: _cartId,
			}).then(({ data }) => {
				const { lines, totalQuantity: _totalQuantity } = data.cart;

				setTotalQuantity(_totalQuantity);
				setItems(lines.edges.map(({ node }) => node));
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
			Responses.AddToCart | Responses.CreateCart,
			Requests.AddToCart | Requests.CreateCart
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
				("cartCreate" in data ? data.cartCreate : data.cartLinesAdd)
					.cart
		);

		setCartId(id);
		setTotalQuantity(_totalQuantity);

		if (checkoutUrl !== _checkoutUrl) {
			setCheckoutUrl(_checkoutUrl);
		}

		if (lines.edges.length > 0) {
			setItems(lines.edges.map(({ node }) => node));
		}
	};

	const updateCart = async (id: string, quantity: number) => {
		const { data, error } = await requestShopify<
			Responses.UpdateCart,
			Requests.UpdateCart
		>(UpdateCartQuery, { cartId, lines: [{ id, quantity }] });

		if (error) {
			throw error;
		}

		const {
			checkoutUrl: _checkoutUrl,
			id: _cartId,
			lines,
			totalQuantity: _totalQuantity,
		} = data.cartLinesUpdate.cart;

		setCartId(_cartId);
		setTotalQuantity(_totalQuantity);

		if (checkoutUrl !== _checkoutUrl) {
			setCheckoutUrl(_checkoutUrl);
		}

		if (lines.edges.length > 0) {
			setItems(lines.edges.map(({ node }) => node));
		}
	};

	return (
		<CartContext.Provider
			value={{ addToCart, cartId, items, totalQuantity, updateCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

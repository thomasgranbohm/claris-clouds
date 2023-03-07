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
import RemoveFromCartQuery from "queries/shopify/RemoveFromCart.gql";
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
	removeFromCart: (cartLineId: string) => void;
	totalQuantity: number;
	updateCart: (id: string, quantity: number) => void;
	updating: boolean;
}

export const CartContext = createContext<CartContextSchema>({
	addToCart: () => void 0,
	// clearCart: () => void 0,
	cartId: "",
	items: [],
	removeFromCart: () => void 0,
	totalQuantity: 0,
	updateCart: () => void 0,
	updating: false,
});

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [cartId, setCartId] = useState<string>("");
	const [checkoutUrl, setCheckoutUrl] = useState<string>();
	const [items, setItems] = useState<Shopify.CartItem[]>([]);
	const [totalQuantity, setTotalQuantity] = useState<number>(0);

	const [updating, setUpdating] = useState<boolean>(false);

	const updateCartInfo = ({
		checkoutUrl: _checkoutUrl,
		id,
		lines,
		totalQuantity: _totalQuantity,
	}: Shopify.Cart) => {
		setCartId(id);
		setTotalQuantity(_totalQuantity);

		if (checkoutUrl !== _checkoutUrl) {
			setCheckoutUrl(_checkoutUrl);
		}

		if (lines.edges.length > 0) {
			setItems(lines.edges.map(({ node }) => node));
		}
	};

	// Save cartId
	useEffect(() => {
		const _cartId = window.localStorage.getItem("cart-id");

		if (cartId && !_cartId) {
			window.localStorage.setItem("cart-id", cartId);
		} else if (!cartId && _cartId) {
			setCartId(_cartId);
			setUpdating(true);

			requestShopify<Responses.GetCart, Requests.GetCart>(GetCartQuery, {
				id: _cartId,
			})
				.then(({ data }) => {
					const { lines, totalQuantity: _totalQuantity } = data.cart;

					setTotalQuantity(_totalQuantity);
					setItems(lines.edges.map(({ node }) => node));
				})
				.finally(() => {
					setUpdating(false);
				});
		}
	}, [cartId]);

	const addToCart = async (merchandiseId: string, quantity: number) => {
		setUpdating(true);
		setTotalQuantity((q) => q + quantity);

		const cart = await requestShopify<
			Responses.AddToCart | Responses.CreateCart,
			Requests.AddToCart | Requests.CreateCart
		>(
			cartId ? AddToCartQuery : CreateCartQuery,
			cartId
				? {
						cartId,
						lines: [{ merchandiseId, quantity }],
				  }
				: {
						lines: [{ merchandiseId, quantity }],
				  }
		).then(
			({ data }) =>
				("cartCreate" in data ? data.cartCreate : data.cartLinesAdd)
					.cart
		);

		updateCartInfo(cart);
		setUpdating(false);
	};

	const updateCart = async (id: string, quantity: number) => {
		setUpdating(true);
		const nItems = items.slice();

		const nId = nItems.findIndex((a) => a.id === id);

		nItems[nId].quantity = quantity;

		setItems(nItems);

		const { data, error } = await requestShopify<
			Responses.UpdateCart,
			Requests.UpdateCart
		>(UpdateCartQuery, { cartId, lines: [{ id, quantity }] });

		if (error) {
			throw error;
		}

		updateCartInfo(data.cartLinesUpdate.cart);

		setUpdating(false);
	};

	const removeFromCart = async (cartLineId: string) => {
		setUpdating(true);

		setItems((_items) => {
			const i = _items.findIndex((item) => item.id === cartLineId);

			if (i === -1) {
				return _items;
			}

			return [..._items.slice(0, i), ...items.slice(i + 1)];
		});

		const { data, error } = await requestShopify<
			Responses.RemoveFromCart,
			Requests.RemoveFromCart
		>(RemoveFromCartQuery, { cartId, lineIds: [cartLineId] });

		if (error) {
			throw error;
		}

		updateCartInfo(data.cartLinesRemove.cart);

		setUpdating(false);
	};

	return (
		<CartContext.Provider
			value={{
				addToCart,
				cartId,
				items,
				removeFromCart,
				totalQuantity,
				updateCart,
				updating,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

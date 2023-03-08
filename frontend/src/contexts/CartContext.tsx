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

interface CartContextSchema
	extends Pick<Shopify.Cart, "checkoutUrl" | "totalQuantity"> {
	addToCart: (merchandiseId: string, quantity: number) => void;
	cart?: Shopify.Cart;
	cost: Shopify.Price;
	items: Shopify.CartItem[];
	removeFromCart: (cartLineId: string) => void;
	setCart: (_cart: Shopify.Cart) => void;
	updateCart: (id: string, quantity: number) => void;
	updating: boolean;
}

export const CartContext = createContext<CartContextSchema>({
	addToCart: () => void 0,
	checkoutUrl: "",
	cost: { amount: "0", currencyCode: "EUR" },
	items: [],
	removeFromCart: () => void 0,
	setCart: () => void 0,
	totalQuantity: 0,
	updateCart: () => void 0,
	updating: false,
});

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<Shopify.Cart>();
	const [checkoutUrl, setCheckoutUrl] = useState<string>("");
	const [cost, setCost] = useState<Shopify.Price>({
		amount: "0",
		currencyCode: "EUR",
	});
	const [items, setItems] = useState<Shopify.CartItem[]>([]);
	const [totalQuantity, setTotalQuantity] = useState<number>(0);

	const [updating, setUpdating] = useState<boolean>(false);

	// Save cartId
	useEffect(() => {
		const _cartId = document.cookie
			.split("; ")
			.find((cookie) => cookie.startsWith("cart-id"))
			?.split("=")[1];

		if (cart && !_cartId) {
			// Should set
			document.cookie = `cart-id=${cart.id}`;
		} else if (!cart && _cartId) {
			// Should get
			setUpdating(true);
			requestShopify<Responses.GetCart, Requests.GetCart>(GetCartQuery, {
				id: _cartId,
			})
				.then(({ data }) => {
					updateCartInfo(data.cart);
				})
				.finally(() => {
					setUpdating(false);
				});
		}
	}, [cart]);

	const updateCartInfo = (_cart: Shopify.Cart) => {
		setCart(_cart);
		setCheckoutUrl(_cart.checkoutUrl);
		setCost(_cart.cost.totalAmount);
		setItems(_cart.lines.edges.map(({ node }) => node));
		setTotalQuantity(_cart.totalQuantity);
	};

	const addToCart = async (merchandiseId: string, quantity: number) => {
		setUpdating(true);
		setTotalQuantity((q) => q + quantity);

		const _cart = await requestShopify<
			Responses.AddToCart | Responses.CreateCart,
			Requests.AddToCart | Requests.CreateCart
		>(
			cart ? AddToCartQuery : CreateCartQuery,
			cart
				? {
						cartId: cart.id,
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

		updateCartInfo(_cart);
		setUpdating(false);
	};

	const updateCart = async (id: string, quantity: number) => {
		if (!cart) {
			return false;
		}

		setUpdating(true);
		const nItems = items.slice();

		const nId = nItems.findIndex((a) => a.id === id);

		nItems[nId].quantity = quantity;

		setItems(nItems);

		const { data, error } = await requestShopify<
			Responses.UpdateCart,
			Requests.UpdateCart
		>(UpdateCartQuery, { cartId: cart.id, lines: [{ id, quantity }] });

		if (error) {
			throw error;
		}

		updateCartInfo(data.cartLinesUpdate.cart);

		setUpdating(false);
	};

	const removeFromCart = async (cartLineId: string) => {
		if (!cart) {
			return false;
		}

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
		>(RemoveFromCartQuery, { cartId: cart.id, lineIds: [cartLineId] });

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
				cart,
				checkoutUrl,
				cost,
				items,
				removeFromCart,
				setCart,
				totalQuantity,
				updateCart,
				updating,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

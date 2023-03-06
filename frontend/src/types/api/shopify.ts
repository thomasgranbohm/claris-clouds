export namespace Shopify {
	export type Data<ResponseData> = ResponseData extends Array<unknown>
		? {
				edges: Array<{
					node: ResponseData[0];
				}>;
		  }
		: ResponseData;

	export type Response<ResponseData> = {
		data: ResponseData;
		error: any;
	};

	export type ProductPreview = {
		description: string;
		featuredImage: Image;
		handle: string;
		id: string;
		title: string;
	};

	export interface ProductOption {
		name: string;
		values: string[];
	}

	export interface Price {
		amount: string;
		currencyCode: string;
	}

	export interface Option {
		name: string;
		value: string;
	}

	export interface Variant {
		currentlyNotInStock: boolean;
		id: string;
		image: Shopify.Image;
		price: Shopify.Price;
		quantityAvailable: number;
		selectedOptions: Shopify.Option[];
		sku: string;
	}

	export interface Product extends ProductPreview {
		descriptionHtml: string;
		options: Shopify.ProductOption[];
		priceRange: { minVariantPrice: Shopify.Price };
		totalInventory: number;
		variants: Data<Variant[]>;
	}

	export type Image = {
		altText?: string;
		height: number;
		url: string;
		width: number;
	};

	export type CartItemPreview = {
		id: string;
		merchandise: {
			id: string;
		};
		quantity: number;
	};

	export type CartPreview = {
		id: string;
		lines: Shopify.Data<CartItemPreview[]>;
		totalQuantity: number;
	};

	export interface CartItem extends CartItemPreview {
		merchandise: {
			id: string;
			image: Shopify.Image;
			price: Price;
			product: {
				title: string;
			};
			quantityAvailable: number;
			selectedOptions: Shopify.Option[];
			title: string;
		};
	}

	export interface Cart extends CartPreview {
		checkoutUrl: string;
		cost: {
			subtotalAmount: Shopify.Price;
			totalAmount: Shopify.Price;
		};
		createdAt: string;
		id: string;
		lines: Shopify.Data<Shopify.CartItem[]>;
		totalQuantity: number;
		updatedAt: string;
	}
}

export namespace Requests {
	export interface GetCart {
		id: string;
	}
	export interface GetCartPreview {
		id: string;
	}
	export interface UpdateCart {
		cartId: string;
		lines: [{ id: string; quantity: number }];
	}
	export interface AddToCart {
		cartId: string;
		lines: [{ merchandiseId: string; quantity: number }];
	}
	export interface CreateCart {
		lines: [{ merchandiseId: string; quantity: number }];
	}
	export interface GetProduct {
		handle: string;
	}
}

export namespace Responses {
	export interface GetCart {
		cart: Shopify.Cart;
	}
	export interface GetCartPreview {
		cart: Shopify.CartPreview;
	}
	export interface UpdateCart {
		cartLinesUpdate: { cart: Shopify.Cart };
	}
	export interface AddToCart {
		cartLinesAdd: { cart: Shopify.Cart };
	}
	export interface CreateCart {
		cartCreate: { cart: Shopify.Cart };
	}
	export interface GetProductPreviews {
		products: Shopify.Data<Shopify.ProductPreview[]>;
	}
	export interface GetProduct {
		product: Shopify.Data<Shopify.Product>;
	}
	export interface GetProductSlugs {
		products: Shopify.Data<Pick<Shopify.Product, "handle">[]>;
	}
}

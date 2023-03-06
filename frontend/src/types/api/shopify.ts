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
		featuredImage: Image;
		handle: string;
		id: string;
		short_description: Shopify.MetaField<"descriptions", "short"> | null;
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

	export interface MetaFieldValue {
		children?: MetaFieldValue[];
		type: string;
	}

	export interface MetaField<Namespace extends string, Key extends string> {
		key: Key;
		namespace: Namespace;
		value: string;
	}

	export interface Product extends ProductPreview {
		descriptionHtml: string;
		options: Shopify.ProductOption[];
		priceRange: { minVariantPrice: Shopify.Price };
		technical_description: MetaField<"descriptions", "technical"> | null;
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

export namespace Metafields {
	export type All =
		| Root
		| List
		| List
		| ListItem
		| Text
		| Link
		| Paragraph
		| Heading;
	interface Base<Type extends string> {
		children: Metafields.All[];
		type: Type;
	}
	export interface Root extends Base<"root"> {}
	export interface List extends Base<"list"> {
		listType: "unordered" | "ordered";
	}
	export interface ListItem extends Base<"list-item"> {}
	export interface Text {
		bold?: true;
		type: "text";
		value: string;
	}
	export interface Link extends Base<"link"> {
		target?: "_blank";
		title?: string;
		url: string;
	}
	export interface Paragraph extends Base<"paragraph"> {}
	export interface Heading extends Base<"heading"> {
		level: 1 | 2 | 3 | 4 | 5 | 6;
	}
}

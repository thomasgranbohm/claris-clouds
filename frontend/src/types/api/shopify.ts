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

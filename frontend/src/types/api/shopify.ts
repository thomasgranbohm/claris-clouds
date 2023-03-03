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

	export interface Option {
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
		selectedOptions: Shopify.Option[];
		sku: string;
	}
	export interface Product extends ProductPreview {
		descriptionHtml: string;
		options: Option[];
		variants: Data<Variant[]>;
	}

	export type Image = {
		altText?: string;
		height: number;
		url: string;
		width: number;
	};
}

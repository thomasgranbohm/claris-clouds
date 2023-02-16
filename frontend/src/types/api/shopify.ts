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

	export type Product = {
		description: string;
		featuredImage: Image;
		handle: string;
		id: string;
		title: string;
	};

	export type Image = {
		altText?: string;
		height: number;
		url: string;
		width: number;
	};
}

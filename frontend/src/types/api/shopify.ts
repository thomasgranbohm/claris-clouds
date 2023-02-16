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
}

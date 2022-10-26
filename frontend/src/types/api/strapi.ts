export type Response<T> = {
	data: T extends Array<any>
		? Array<{
				attributes: T[0];
				id: number;
		  }>
		: {
				attributes: T;
				id: number;
		  };
	error?: ResponseError;
	meta?: {
		pagination?: {
			page: number;
			pageCount: number;
			pageSize: number;
			total: number;
		};
	};
};

export type ResponseError = {
	details: object;
	message: string;
	name: string;
	status: 404;
};

export type ImageFormat = {
	ext: string;
	hash: string;
	height: number;
	mime: string;
	name: string;
	path?: any;
	size: number;
	url: string;
	width: number;
};

export type ImageFormatNames = "thumbnail" | "small" | "medium" | "large";

export type Image = {
	alternativeText: string;
	caption: string;
	createdAt: Date;
	ext: string;
	formats: {
		[formatName in ImageFormatNames]: ImageFormat;
	};
	hash: string;
	height: number;
	mime: string;
	name: string;
	previewUrl?: any;
	provider: string;
	provider_metadata?: any;
	size: number;
	updatedAt: Date;
	url: string;
	width: number;
};

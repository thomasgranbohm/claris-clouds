import { Response } from "types/api/strapi";

const stripWrapper = <T>(a: Response<T>): T => {
	if (Array.isArray(a.data)) {
		// TODO: needs better typings to automatically inter that T is an array
		throw new Error("Not implemented.");
	} else {
		return a.data.attributes;
	}
};

export default stripWrapper;

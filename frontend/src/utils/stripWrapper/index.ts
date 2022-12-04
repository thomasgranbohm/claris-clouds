import { GraphQL } from "types/api/strapi";

const stripWrapper = <T>(a: GraphQL.Data<T>): T => {
	if (Array.isArray(a.data)) {
		// TODO: needs better typings to automatically inter that T is an array
		return a.data.map((b) => b.attributes) as T;
	} else {
		return a.data.attributes;
	}
};

export default stripWrapper;

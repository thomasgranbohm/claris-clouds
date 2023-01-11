/**
 * purchase-request controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
	"api::purchase-request.purchase-request",
	({ strapi }) => ({
		async create(all) {
			console.log(all);

			all.query;

			return null;
		},
	})
);

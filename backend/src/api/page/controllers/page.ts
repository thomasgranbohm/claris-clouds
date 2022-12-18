/**
 * page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
	"api::page.page",
	({ strapi }) => ({
		async findOne(ctx) {
			const { id: slug } = ctx.params;

			const entity = await strapi.db.query("api::page.page").findOne({
				where: {
					slug,
				},
				populate: ["image"],
			});

			const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

			return this.transformResponse(sanitizedEntity);
		},
	})
);

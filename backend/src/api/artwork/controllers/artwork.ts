/**
 * artwork controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
	"api::artwork.artwork",
	({ strapi }) => ({
		async findOne(ctx) {
			const { id: slug } = ctx.params;

			const entity = await strapi.db
				.query("api::artwork.artwork")
				.findOne({
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

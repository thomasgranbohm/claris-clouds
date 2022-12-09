import utils from "@strapi/utils";

const { NotFoundError } = utils.errors;

export default {
	register({ strapi }) {
		const extensionService = strapi.plugin("graphql").service("extension");

		extensionService.use(({ strapi }) => ({
			typeDefs: `type Query {
				artwork(slug: String!): ArtworkEntityResponse
			}`,
			resolvers: {
				Query: {
					artwork: {
						resolve: async (_, args, context) => {
							const { toEntityResponse } = strapi.service(
								"plugin::graphql.format"
							).returnTypes;

							const data = await strapi.services[
								"api::artwork.artwork"
							].find({
								filters: { slug: args.slug },
							});

							if (data.results.length === 0) {
								throw new NotFoundError();
							}

							const response = toEntityResponse(data.results[0]);

							return response;
						},
					},
				},
			},
		}));
	},

	/**
	 * An asynchronous bootstrap function that runs before
	 * your application gets started.
	 *
	 * This gives you an opportunity to set up your data model,
	 * run jobs, or perform some special logic.
	 */
	bootstrap(/*{ strapi }*/) {},
};

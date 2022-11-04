module.exports = ({ env }) => ({
	slugify: {
		enabled: true,
		config: {
			contentTypes: {
				artwork: {
					field: "slug",
					references: "name",
				},
			},
			shouldUpdateSlug: true,
			slugifyOptions: {
				lower: true,
				trim: true,
				locale: "en_EN",
				remove: /[*+~.()'"!:@]/g,
			},
		},
	},
});

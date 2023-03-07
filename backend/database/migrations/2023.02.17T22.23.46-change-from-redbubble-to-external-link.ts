module.exports = {
	async up(knex) {
		await knex.schema.table("public.artworks", (table) => {
			table.renameColumn("redbubble_link", "external_link");
		});
	},
};

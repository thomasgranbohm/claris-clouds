export default ({ env }) => ({
	connection: {
		client: "postgres",
		connection: {
			host: "database",
			port: 5432,
			database: env("DATABASE_NAME", "clarisclouds"),
			user: env("DATABASE_USERNAME", "strapi"),
			password: env("DATABASE_PASSWORD", "strapi"),
		},
		debug: false,
	},
});

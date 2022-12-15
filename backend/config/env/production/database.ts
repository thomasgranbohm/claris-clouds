export default ({ env }) => ({
	connection: {
		client: "postgres",
		connection: {
			host: "database",
			port: 5432,
			database: env("DATABASE_NAME"),
			user: env("DATABASE_USERNAME"),
			password: env("DATABASE_PASSWORD"),
		},
		debug: false,
	},
});

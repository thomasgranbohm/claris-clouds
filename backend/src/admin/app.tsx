export default {
	config: {
		locales: [],
		tutorials: false,
		notifications: { releases: false },
		translations: {
			en: {
				"app.components.LeftMenu.navbrand.title": "Clari's Clouds",
				"app.components.LeftMenu.navbrand.workplace":
					process.env.NODE_ENV === "production"
						? "Production"
						: "Development",
			},
		},
	},
	bootstrap(app) {},
};

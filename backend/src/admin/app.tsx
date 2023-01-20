import Logo from "./extensions/logo@256px.png";

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
		head: { favicon: Logo },
		auth: { logo: Logo },
		menu: { logo: Logo },
	},
	bootstrap(app) {},
};

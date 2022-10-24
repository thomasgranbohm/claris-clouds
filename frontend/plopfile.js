function plopFunction(
	/** @type {import('plop').NodePlopAPI} */
	plop
) {
	plop.setHelper("ifOr", function (a, b, options) {
		if (a || b) {
			return options.fn(this);
		}

		return options.inverse(this);
	});
	plop.setGenerator("component", {
		description: "Create a component",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Component name:",
			},
			{
				type: "confirm",
				default: false,
				message: "With children",
				name: "children",
			},
			{
				type: "confirm",
				default: true,
				message: "With classname",
				name: "className",
			},
		],
		actions: [
			{
				type: "add",
				templateFile: "templates/component/exports.hbs",
				path: "src/components/{{ properCase name }}/index.ts",
			},
			{
				type: "add",
				templateFile: "templates/component/stories.hbs",
				path: "src/components/{{ properCase name }}/{{ properCase name }}.stories.tsx",
			},
			{
				type: "add",
				templateFile: "templates/component/styling.hbs",
				path: "src/components/{{ properCase name }}/{{ properCase name }}.module.scss",
			},
			{
				type: "add",
				templateFile: "templates/component/typescript.hbs",
				path: "src/components/{{ properCase name }}/{{ properCase name }}.tsx",
			},
		],
	});
}

module.exports = plopFunction;

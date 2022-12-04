import { FC, Fragment } from "react";

import { ArtworkDisplay } from "components/ComponentRenderer/components";

import Sections from "types/sections";

interface ComponentRendererProps {
	components: Array<Sections>;
}

const ComponentRenderer: FC<ComponentRendererProps> = ({ components }) => {
	const renderSection = (section: Sections, index: number) => {
		let Element = null;

		switch (section.__typename) {
			case "ComponentSectionsArtworkDisplay":
				Element = ArtworkDisplay;
				break;
			default:
				return null;
		}

		return <Element key={index} {...section} />;
	};

	return <Fragment>{components.map(renderSection)}</Fragment>;
};

export default ComponentRenderer;

import { FC, Fragment, FunctionComponent } from "react";

import {
	ArtworkDisplay,
	CallToAction,
	RichText,
	Showcase,
	TextWithPicture,
} from "components/ComponentRenderer/components";

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
			case "ComponentSectionsCallToAction":
				Element = CallToAction;
				break;
			case "ComponentSectionsRichText":
				Element = RichText;
				break;
			case "ComponentSectionsShowcase":
				Element = Showcase;
				break;
			case "ComponentSectionsTextWithPicture":
				Element = TextWithPicture;
				break;
			default:
				throw new Error("Not implemented");
		}

		Element = Element as unknown as FunctionComponent;

		return <Element {...section} key={index} />;
	};

	return <Fragment>{components.map(renderSection)}</Fragment>;
};

export default ComponentRenderer;

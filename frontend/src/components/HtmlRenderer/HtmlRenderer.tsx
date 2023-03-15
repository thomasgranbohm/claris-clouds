import { FC, Fragment } from "react";
import clsx from "clsx";
import parse, {
	domToReact,
	Element,
	HTMLReactParserOptions,
} from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

import List, { ListItem } from "components/List";
import Typography from "components/Typography";

import { WithClassname } from "types/components";

import classes from "./HtmlRenderer.module.scss";

interface HtmlRendererProps extends WithClassname {
	content: string;
}

const HtmlRenderer: FC<HtmlRendererProps> = ({ content }) => {
	const options: HTMLReactParserOptions = {
		htmlparser2: {},
		replace: (domNode) => {
			const element = domNode as Element;

			if (element.name === "p") {
				return (
					<Typography>
						{domToReact(element.children, options)}
					</Typography>
				);
			} else if (element.name === "li") {
				return (
					<ListItem>{domToReact(element.children, options)}</ListItem>
				);
			} else if (element.name === "ul") {
				return (
					<List variant="unordered">
						{domToReact(element.children, options)}
					</List>
				);
			}

			return domNode;
		},
		trim: true,
	};

	return (
		<Fragment>
			{parse(
				DOMPurify.sanitize(content.trim(), {
					FORBID_TAGS: ["script"],
					USE_PROFILES: { html: true },
				}),
				options
			)}
		</Fragment>
	);
};

export default HtmlRenderer;

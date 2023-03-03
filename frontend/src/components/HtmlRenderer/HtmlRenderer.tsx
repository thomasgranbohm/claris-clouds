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
		replace: (domNode) => {
			const element = domNode as Element;

			console.log(element.name);

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
	};

	return <Fragment>{parse(DOMPurify.sanitize(content), options)}</Fragment>;
};

export default HtmlRenderer;

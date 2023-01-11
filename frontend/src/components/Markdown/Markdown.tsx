import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import Heading from "components/Heading";
import Link from "components/Link";
import List, { ListItem } from "components/List";
import Typography from "components/Typography";

interface MarkdownProps {
	text: string;
}

const Markdown: FC<MarkdownProps> = ({ text }) => {
	return (
		<ReactMarkdown
			// eslint-disable-next-line react/no-children-prop
			children={text}
			components={{
				a({ children, node }) {
					const { properties } = node;
					if (!properties) {
						return null;
					}

					const { href } = properties;
					if (!href) {
						return null;
					}

					return <Link href={href.toString()}>{children}</Link>;
				},
				b({ children }) {
					return <Heading type="b">{children}</Heading>;
				},
				h1({ children }) {
					return <Heading type="h1">{children}</Heading>;
				},
				h2({ children }) {
					return <Heading type="h2">{children}</Heading>;
				},
				h3({ children }) {
					return <Heading type="h3">{children}</Heading>;
				},
				h4({ children }) {
					return <Heading type="h4">{children}</Heading>;
				},
				h5({ children }) {
					return <Heading type="h5">{children}</Heading>;
				},
				h6({ children }) {
					return <Heading type="h6">{children}</Heading>;
				},
				li({ children }) {
					return <ListItem>{children}</ListItem>;
				},
				ol({ children }) {
					return <List variant="ordered">{children}</List>;
				},
				p({ children }) {
					return <Typography>{children}</Typography>;
				},
				ul({ children }) {
					return <List variant="unordered">{children}</List>;
				},
			}}
		/>
	);
};

export default Markdown;

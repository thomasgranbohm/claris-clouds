import { FC, Fragment } from "react";

import Heading from "components/Heading";
import Link from "components/Link";
import List, { ListItem } from "components/List";
import Typography from "components/Typography";

import { Metafields } from "types/api/shopify";
import { WithClassname } from "types/components";

interface MetafieldParserProps extends WithClassname {
	value: string;
}

const MetafieldParser: FC<MetafieldParserProps> = ({
	className,
	value: _value,
}) => {
	const value = JSON.parse(_value) as Metafields.All;

	const parseMetafield = (field: Metafields.All, index?: number) => {
		const props = {
			key: index || 0,
		};

		switch (field.type) {
			case "root":
				return (
					<Fragment {...props}>
						{field.children.map(parseMetafield)}
					</Fragment>
				);
			case "list":
				return (
					<List {...props} variant={field.listType}>
						{field.children.map(parseMetafield)}
					</List>
				);
			case "list-item":
				return (
					<ListItem {...props}>
						{field.children.map(parseMetafield)}
					</ListItem>
				);
			case "text":
				if (field.value.length === 0) {
					return null;
				}

				return field.bold ? (
					<strong {...props}>{field.value}</strong>
				) : (
					<Fragment {...props}>{field.value}</Fragment>
				);
			case "link":
				return (
					<Link
						{...props}
						href={field.url}
						target={field.target}
						aria-label={field.title}
					>
						{field.children.map(parseMetafield)}
					</Link>
				);
			case "paragraph":
				return (
					<Typography {...props}>
						{field.children.map(parseMetafield)}
					</Typography>
				);
			case "heading":
				return (
					<Heading {...props} type={`h${field.level}`}>
						{field.children.map(parseMetafield)}
					</Heading>
				);
		}
	};

	return parseMetafield(value);
};

export default MetafieldParser;

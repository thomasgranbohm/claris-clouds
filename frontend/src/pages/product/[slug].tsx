import { useEffect, useState } from "react";
import { Item } from "react-stately";
import { GetStaticPaths } from "next";

import { getArtworkSlugs } from "api/artwork";
import requestShopify from "api/shopify";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import HtmlRenderer from "components/HtmlRenderer";
import { ShopifyImage } from "components/Image";
import Layout from "components/Layout";
import OptionSelector from "components/OptionSelector";

import ProductByHandle from "queries/shopify/ProductByHandle.gql";

import { Shopify } from "types/api/shopify";
import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getStaticProps = getLayoutDataSSG<ProductPageProps>(
	async ({ params }) => {
		const slug = params?.["slug"];

		if (!slug) {
			return {
				notFound: true,
			};
		}

		const resp = await requestShopify<{
			productByHandle: Shopify.Data<Shopify.Product>;
		}>(ProductByHandle, { handle: slug });

		return {
			props: { product: resp.data.productByHandle },
		};
	}
);

export const getStaticPaths: GetStaticPaths = async () => {
	if (process.env.NODE_ENV !== "production") {
		return { fallback: "blocking", paths: [] };
	}

	const { data } = await getArtworkSlugs();

	return {
		fallback: "blocking",
		paths: stripWrapper(data.artworks).map((p) => ({
			params: { slug: p.slug },
		})),
	};
};

interface ProductPageProps {
	product: Shopify.Product;
}

const ArtworkPage: LayoutPage<ProductPageProps> = ({ layout, product }) => {
	const {
		description,
		descriptionHtml,
		featuredImage,
		options: _options,
		title,
		variants,
	} = product;

	const [options, setOptions] = useState<Record<string, string>>({});
	const [variant, setVariant] = useState<Shopify.Variant | null>(
		variants.edges[0].node
	);

	useEffect(() => {
		const foundVariant = variants.edges.find((_v) => {
			return (
				Object.keys(options).length > 0 &&
				_v.node.selectedOptions.every(
					({ name, value }) => options[name] === value
				)
			);
		});

		if (foundVariant) {
			setVariant(foundVariant.node);
		} else {
			setVariant(variants.edges[0].node);
		}
	}, [variants.edges, options]);

	return (
		<Layout {...layout}>
			<Row>
				<Column md={6}>
					<ShopifyImage
						image={
							variant
								? variant.media.edges[0].node.preview.image
								: featuredImage
						}
						style={{
							height: "auto",
							maxWidth: "100%",
							objectFit: "contain",
						}}
					/>
				</Column>
				<Column md={6} align="end">
					<Heading type="h1">{title}</Heading>
					{_options.map((option) => (
						<OptionSelector
							key={option.name}
							label={option.name}
							selectionMode="single"
							onSelectionChange={(keys) => {
								const value = Array.from(keys).pop();

								if (!value && options[option.name]) {
									delete options[option.name];
								} else if (value) {
									options[option.name] = value.toString();
								}

								setOptions((oldSO) => ({
									...oldSO,
									...options,
								}));
							}}
						>
							{option.values.map((value) => (
								<Item key={value}>{value}</Item>
							))}
						</OptionSelector>
					))}
				</Column>
			</Row>
			{description.length > 0 && (
				<Row>
					<Column md={[8, 2]} lg={[6, 3]}>
						<Heading type="h3">About the artwork</Heading>
						<HtmlRenderer content={descriptionHtml} />
					</Column>
				</Row>
			)}
			<pre>
				<code>{JSON.stringify(product, null, 4)}</code>
			</pre>
		</Layout>
	);
};

export default ArtworkPage;

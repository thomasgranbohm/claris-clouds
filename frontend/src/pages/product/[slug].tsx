import { useEffect, useMemo, useState } from "react";
import { Item } from "react-stately";
import { useCartContext } from "contexts/CartContext";
import { GetStaticPaths } from "next";

import requestShopify from "api/shopify";

import { StyledButton } from "components/Button";
import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import HtmlRenderer from "components/HtmlRenderer";
import { ShopifyImage } from "components/Image";
import Layout from "components/Layout";
import MetafieldParser from "components/MetafieldParser";
import OptionSelector from "components/OptionSelector";
import QuantitySelector from "components/QuantitySelector";
import Typography from "components/Typography";

import ProductByHandle from "queries/shopify/ProductByHandle.gql";
import ProductSlugs from "queries/shopify/ProductSlugs.gql";

import { Requests, Responses, Shopify } from "types/api/shopify";
import { LayoutPage } from "types/components";

import { getLayoutDataSSR } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSR<ProductPageProps>(
	async ({ params }) => {
		const slug = params?.["slug"];

		if (!slug) {
			return {
				notFound: true,
			};
		}

		const { data, error } = await requestShopify<
			Responses.GetProduct,
			Requests.GetProduct
		>(ProductByHandle, { handle: slug.toString() });

		if (error) {
			throw error;
		}

		if (data.product === null) {
			throw new Error("Product is null");
		}

		return {
			props: { product: data.product },
		};
	}
);

export const getStaticPaths: GetStaticPaths = async () => {
	if (process.env.NODE_ENV !== "production") {
		return { fallback: "blocking", paths: [] };
	}
	const { data, error } = await requestShopify<Responses.GetProductSlugs>(
		ProductSlugs
	);

	if (error) {
		throw error;
	}

	return {
		fallback: "blocking",
		paths: data.products.edges.map(({ node }) => ({
			params: { slug: node.handle },
		})),
	};
};

interface ProductPageProps {
	product: Shopify.Product;
}

const ArtworkPage: LayoutPage<ProductPageProps> = ({ layout, product }) => {
	const {
		descriptionHtml,
		featuredImage,
		options: _options,
		priceRange,
		technical_description,
		title,
		totalInventory,
		variants,
	} = product;

	const [options, setOptions] = useState<Record<string, string>>({});
	const [variant, setVariant] = useState<Shopify.Variant | null>(null);
	const [quantity, setQuantity] = useState<number>(1);

	const { addToCart, items } = useCartContext();

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
			setVariant(null);
		}
	}, [variants.edges, options]);

	const isDisabled = useMemo(
		() =>
			variant === null ||
			(items.find((i) => i.merchandise.id === variant.id)?.quantity ||
				0) >= variant.quantityAvailable,
		[variant, items]
	);

	return (
		<Layout {...layout}>
			<Row>
				<Column md={6}>
					<ShopifyImage
						image={
							variant
								? variant.image
								: variants.edges[0].node.image || featuredImage
						}
						style={{
							aspectRatio: "4 / 3",
							height: "auto",
							maxWidth: "100%",
							objectFit: "cover",
							verticalAlign: "bottom",
						}}
					/>
				</Column>
				<Column md={6} align="start">
					<Heading type="h1">{title}</Heading>
					<Typography>
						<b>Price:</b>{" "}
						{variant ? (
							<>
								{Number(variant.price.amount).toFixed(2)}{" "}
								{variant.price.currencyCode}
							</>
						) : (
							<>
								from{" "}
								{Number(
									priceRange.minVariantPrice.amount
								).toFixed(2)}{" "}
								{priceRange.minVariantPrice.currencyCode}
							</>
						)}
					</Typography>
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
					<QuantitySelector
						label="Quantity"
						max={variant?.quantityAvailable || totalInventory}
						onChange={setQuantity}
						value={quantity}
					/>
					<StyledButton
						isDisabled={isDisabled}
						title={isDisabled ? "Variant is sold out" : ""}
						onPress={() => {
							if (!variant) {
								return null;
							}

							const existing = items.find(
								({ merchandise }) =>
									merchandise.id === variant.id
							);

							if (
								existing &&
								existing.quantity + 1 >
									variant.quantityAvailable
							) {
								return null;
							}

							addToCart(variant.id, 1);
						}}
					>
						Add to cart
					</StyledButton>
					{descriptionHtml.length > 0 && (
						<Row>
							<Column>
								<HtmlRenderer content={descriptionHtml} />
							</Column>
						</Row>
					)}
					{technical_description && (
						<Row>
							<Column>
								<Heading type="h3">About the artwork</Heading>
								<MetafieldParser
									value={technical_description.value}
								/>
							</Column>
						</Row>
					)}
				</Column>
			</Row>
		</Layout>
	);
};

export default ArtworkPage;

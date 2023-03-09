import { useEffect, useState } from "react";
import { Item } from "react-stately";
import {
	AddToCartButton,
	flattenConnection,
	Image,
	Money,
	ProductProvider,
} from "@shopify/hydrogen-react";
import {
	Product,
	ProductVariant,
} from "@shopify/hydrogen-react/storefront-api-types";
import axios from "axios";
import { print } from "graphql";
import { GetStaticPaths } from "next";

import { getPrivateTokenHeaders, getStorefrontApiUrl } from "api/shopify";

import { StyledButton } from "components/Button";
import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import HtmlRenderer from "components/HtmlRenderer";
import Layout from "components/Layout";
import Link from "components/Link";
import MetaData from "components/MetaData";
import MetafieldParser from "components/MetafieldParser";
import OptionSelector from "components/OptionSelector";
import QuantitySelector from "components/QuantitySelector";
import Typography from "components/Typography";

import ProductByHandle from "queries/shopify/ProductByHandle.gql";
import ProductSlugs from "queries/shopify/ProductSlugs.gql";

import classes from "styles/pages/ArtworkPage.module.scss";

import { Requests, Responses, Shopify } from "types/api/shopify";
import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG<ProductPageProps>(
	async ({ params }) => {
		const slug = params?.["slug"];

		if (!slug) {
			return {
				notFound: true,
			};
		}

		try {
			const { data } = await axios.post<
				Requests.GetProduct,
				{ data: { data: Responses.GetProduct } }
			>(
				getStorefrontApiUrl(),
				{
					query: print(ProductByHandle),
					variables: { handle: slug },
				},
				{
					headers: getPrivateTokenHeaders({
						contentType: "json",
					}),
				}
			);

			return {
				props: data.data,
			};
		} catch (error) {
			throw error;
		}
	}
);

export const getStaticPaths: GetStaticPaths = async () => {
	if (process.env.NODE_ENV !== "production") {
		return { fallback: "blocking", paths: [] };
	}

	const { data } = await axios.post<{
		data: Responses.GetProductSlugs;
	}>(
		getStorefrontApiUrl(),
		{
			query: print(ProductSlugs),
		},
		{
			headers: getPrivateTokenHeaders({
				contentType: "json",
			}),
		}
	);

	return {
		fallback: "blocking",
		paths: data.data.products.edges.map(({ node }) => ({
			params: { slug: node.handle },
		})),
	};
};

interface ProductPageProps {
	latest_products: Shopify.Data<Product[]>;
	product: Shopify.Product & Product;
}

const ArtworkPage: LayoutPage<ProductPageProps> = ({
	campaign,
	latest_products,
	layout,
	product,
}) => {
	const {
		description,
		descriptionHtml,
		featuredImage,
		options,
		priceRange,
		technical_description,
		title,
		variants,
	} = product;

	const [quantity, setQuantity] = useState<number>(1);
	const [variant, setVariant] =
		useState<ProductVariant | undefined>(undefined);
	const [chosenOptions, setChosenOptions] = useState<Map<string, string>>(
		new Map()
	);

	useEffect(() => {
		if (chosenOptions.size > 0) {
			const values = Array.from(chosenOptions.values());

			const variant = variants.edges
				.map(({ node }) => node)
				.find((variant) =>
					variant.selectedOptions.every(({ value }) =>
						values.includes(value)
					)
				);

			return setVariant(variant);
		}

		setVariant(undefined);
	}, [chosenOptions, variants]);

	return (
		<ProductProvider data={product}>
			<Layout campaign={campaign} {...layout}>
				<MetaData
					title={title}
					description={description}
					images={featuredImage ? [featuredImage] : undefined}
				/>
				<Row>
					<Column md={6} className={classes["column"]}>
						{featuredImage && (
							//  eslint-disable-next-line jsx-a11y/alt-text
							<Image
								data={variant?.image || featuredImage}
								style={{
									height: "auto",
									verticalAlign: "bottom",
									width: "100%",
								}}
								loaderOptions={{
									scale: variant ? 2 : undefined,
								}}
							/>
						)}
					</Column>
					<Column md={6} className={classes["column"]}>
						<Heading type="h1">{title}</Heading>
						<Typography>
							<b>Price:</b>{" "}
							<Money
								as="span"
								data={
									variant?.price || priceRange.minVariantPrice
								}
							/>
						</Typography>
						{options.map((option) => (
							<OptionSelector
								key={option.name}
								label={option.name}
								selectionMode="single"
								onSelectionChange={(keys) => {
									const selectedKey = Array.from(keys).pop();

									setChosenOptions((_options) => {
										if (
											!selectedKey &&
											_options.has(option.name)
										) {
											_options.delete(option.name);
										} else if (selectedKey) {
											_options.set(
												option.name,
												selectedKey.toString()
											);
										}

										return new Map(_options);
									});
								}}
							>
								{option.values.map((value) => (
									<Item key={value}>{value}</Item>
								))}
							</OptionSelector>
						))}
						<QuantitySelector
							label="Quantity"
							max={Number(variant?.quantityAvailable) ?? 5}
							onChange={setQuantity}
							value={quantity}
						/>
						<Row>
							<Column lg={6} md={12} sm={6}>
								<AddToCartButton
									as={StyledButton}
									className={classes["add-to-cart"]}
									isDisabled={!variant}
									variantId={variant?.id}
									quantity={quantity}
								>
									Add to cart
								</AddToCartButton>
							</Column>
						</Row>
						{descriptionHtml && (
							<Row>
								<Column>
									<HtmlRenderer content={descriptionHtml} />
								</Column>
							</Row>
						)}
						{technical_description && (
							<Row>
								<Column>
									<Heading type="h2" look="h3">
										About this artwork
									</Heading>
									<MetafieldParser
										value={technical_description.value}
									/>
								</Column>
							</Row>
						)}
					</Column>
				</Row>
				<Row>
					<Column>
						<Heading type="h2" look="h3">
							Latest artworks
						</Heading>
					</Column>
					{latest_products.edges
						.map(({ node }) => node)
						.map((p) => (
							<Column
								xs={6}
								lg={3}
								key={p.handle}
								className={classes["latest-artwork"]}
							>
								<Link
									className={classes["link"]}
									href={`/artwork/${p.handle}`}
									asWrapper
								>
									{p.featuredImage && (
										<div
											className={
												classes["image-container"]
											}
										>
											{/* eslint-disable-next-line jsx-a11y/alt-text */}
											<Image
												data={p.featuredImage}
												className={classes["image"]}
											/>
										</div>
									)}
									<Heading
										className={classes["title"]}
										type="b"
									>
										{p.title}
									</Heading>
									<Typography
										className={classes["pricing"]}
										size="small"
										color="foreground"
									>
										From{" "}
										<Money
											as="span"
											data={p.priceRange.minVariantPrice}
										/>
									</Typography>
								</Link>
							</Column>
						))}
				</Row>
			</Layout>
		</ProductProvider>
	);
};

export default ArtworkPage;

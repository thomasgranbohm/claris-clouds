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
	ProductConnection,
	ProductVariant,
} from "@shopify/hydrogen-react/storefront-api-types";
import axios from "axios";
import { print } from "graphql";
import { NextPage } from "next";

import { getPrivateTokenHeaders, getStorefrontApiUrl } from "api/shopify";

import { StyledButton } from "components/Button";
import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import HtmlRenderer from "components/HtmlRenderer";
import { ShopifyImage } from "components/Image";
import ImageWithZoom from "components/ImageWithZoom";
import Layout from "components/Layout";
import Link from "components/Link";
import { ShopifyMetadata } from "components/MetaData";
import MetafieldParser from "components/MetafieldParser";
import OptionSelector from "components/OptionSelector";
import QuantitySelector from "components/QuantitySelector";
import Typography from "components/Typography";

import ProductByHandle from "queries/shopify/ProductByHandle.gql";

import classes from "styles/pages/ArtworkPage.module.scss";

import { Requests, Responses, Shopify } from "types/api/shopify";

import { getLayoutDataSSR } from "utils/getLayoutData";

export const getServerSideProps = getLayoutDataSSR<ProductPageProps>(
	async ({ params, req }) => {
		const country_code = req.headers["cf-ipcountry"];
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
					variables: { country_code, handle: slug },
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

interface ProductPageProps {
	latest_products: ProductConnection;
	product: Shopify.Product & Product;
}

const ArtworkPage: NextPage<ProductPageProps> = ({
	latest_products,
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
		totalInventory,
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
			<Layout>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org/",
							"@type": "Product",
							brand: {
								"@type": "Brand",
								name: "Clari's Clouds",
							},
							description,
							image: featuredImage?.url,
							name: title,
							offers: flattenConnection(variants).map(
								(variant) => ({
									"@type": "Offer",
									availability: variant.currentlyNotInStock
										? "OutOfStock"
										: "InStock",
									price: variant.price.amount,
									priceCurrency: variant.price.currencyCode,
									seller: {
										"@type": "Organization",
										id: "https://www.clarisclouds.com",
										name: "Clari's Clouds",
									},
									sku: variant.sku,
								})
							),
						}),
					}}
				/>
				<ShopifyMetadata
					title={title}
					description={description}
					image={featuredImage || undefined}
				/>
				<Row>
					<Column md={6} className={classes["column"]}>
						{featuredImage && (
							<ImageWithZoom
								image={variant?.image || featuredImage}
								disabled={Boolean(variant?.image)}
							>
								{/*  eslint-disable-next-line jsx-a11y/alt-text */}
								<ShopifyImage
									image={variant?.image || featuredImage}
									style={{
										height: "auto",
										verticalAlign: "bottom",
										width: "100%",
									}}
								/>
							</ImageWithZoom>
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
						{descriptionHtml && (
							<Row>
								<Column>
									<HtmlRenderer content={descriptionHtml} />
								</Column>
							</Row>
						)}
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
					{flattenConnection(latest_products)
						.filter((node) => node.handle !== product.handle)
						.slice(0, 4)
						.map((node) => (
							<Column
								xs={6}
								lg={3}
								key={node.handle}
								className={classes["latest-artwork"]}
							>
								<Link
									className={classes["link"]}
									href={`/artwork/${node.handle}`}
									asWrapper
								>
									{node.featuredImage && (
										<div
											className={
												classes["image-container"]
											}
										>
											{/* eslint-disable-next-line jsx-a11y/alt-text */}
											<Image
												data={node.featuredImage}
												className={classes["image"]}
											/>
										</div>
									)}
									<Heading
										className={classes["title"]}
										type="b"
									>
										{node.title}
									</Heading>
									<Typography
										className={classes["pricing"]}
										size="small"
										color="foreground"
									>
										From{" "}
										<Money
											as="span"
											data={
												node.priceRange.minVariantPrice
											}
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

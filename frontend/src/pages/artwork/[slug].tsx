import { useEffect, useState } from "react";
import { flattenConnection, Money } from "@shopify/hydrogen-react";
import {
	Product,
	ProductConnection,
	ProductVariant,
} from "@shopify/hydrogen-react/storefront-api-types";
import { AxiosError } from "axios";
import { NextPage } from "next";

import { getProductByHandle } from "api/product";

import ArtworkImageSwiper from "components/ArtworkImageSwiper";
import ArtworkPrice from "components/ArtworkPrice";
import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import HtmlRenderer from "components/HtmlRenderer";
import { ShopifyImage } from "components/Image";
import Layout from "components/Layout";
import Link from "components/Link";
import { ShopifyMetadata } from "components/MetaData";
import MetafieldParser from "components/MetafieldParser";
import Typography from "components/Typography";
import VariantSelector from "components/VariantSelector";

import { ArtworkProvider } from "contexts/ArtworkContext";

import triggerEcommerceEvent from "hooks/triggerEcommerceEvent";

import classes from "styles/pages/ArtworkPage.module.scss";

import { Shopify } from "types/api/shopify";

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
			const { data, status } = await getProductByHandle(
				slug.toString(),
				country_code?.toString()
			);

			if (status === 404 || data.data.product === null) {
				return {
					notFound: true,
				};
			}

			return {
				props: data.data,
			};
		} catch (error) {
			if (error instanceof AxiosError && error.status === 404) {
				return {
					notFound: true,
				};
			}

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
		images,
		priceRange,
		technical_description,
		title,
		variants,
	} = product;

	useEffect(() => {
		if (variants && flattenConnection(variants).length > 0) {
			triggerEcommerceEvent("view_item", {
				currency: priceRange.minVariantPrice.currencyCode,
				items: flattenConnection(variants).map((variant) => ({
					item_id: variant.sku,
					item_name: `${title} (${variant.title})`,
					price: parseFloat(variant.price.amount),
				})),
				value: parseFloat(priceRange.minVariantPrice.amount),
			});
		}
	}, [variants, priceRange, title]);

	return (
		<ArtworkProvider product={product}>
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
						<ArtworkImageSwiper
							images={flattenConnection(images)}
						/>
					</Column>
					<Column md={6} className={classes["column"]}>
						<Heading type="h1">{title}</Heading>
						<ArtworkPrice />
						{descriptionHtml && (
							<Row>
								<Column>
									<HtmlRenderer content={descriptionHtml} />
								</Column>
							</Row>
						)}
						<VariantSelector />
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
								md={3}
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
											<ShopifyImage
												image={node.featuredImage}
												aspectRatio={[1, 1]}
												sizes="(min-width: 1470px) 384px, (min-width: 960px) 256px, (min-width: 768px) 384px, (min-width: 480px) 256px"
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
		</ArtworkProvider>
	);
};

export default ArtworkPage;

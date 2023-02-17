import { Fragment } from "react";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { getArtwork, getArtworkSlugs } from "api/artwork";

import ArtworkLink from "components/ArtworkLink";
import ComponentRenderer from "components/ComponentRenderer";
import Gallery from "components/Gallery";
import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import Icon from "components/Icon";
import { NoWhitespaceImage } from "components/Image";
import Labeler from "components/Labeler";
import Layout from "components/Layout";
import Link, { StyledLink } from "components/Link";
import MetaData from "components/MetaData";
import Typography from "components/Typography";

import classes from "styles/pages/ArtworkPage.module.scss";

import ArtworkSchema, { ArtworkPageSchema } from "types/api/artwork";
import { LayoutPage } from "types/components";

import generateImageBreakpoints from "utils/generateImageBreakpoints";
import { getLayoutDataSSG } from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getStaticProps = getLayoutDataSSG<ArtworkPageProps>(
	async ({ params }) => {
		const slug = params?.["slug"];

		if (!slug) {
			return {
				notFound: true,
			};
		}

		const { data, error } = await getArtwork(slug.toString());

		if (error) {
			if (error.extensions.code === "STRAPI_NOT_FOUND_ERROR") {
				return {
					notFound: true,
				};
			} else {
				throw error;
			}
		}

		return {
			props: {
				artwork: stripWrapper(data.artwork),
				latestArtworks: stripWrapper(data.artworks),
			},
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

interface ArtworkPageProps {
	artwork: ArtworkPageSchema;
	latestArtworks: Pick<ArtworkSchema, "name" | "slug" | "image">[];
}

const ArtworkPage: LayoutPage<ArtworkPageProps> = ({
	artwork,
	latestArtworks,
	layout,
}) => {
	const { asPath } = useRouter();
	const {
		description,
		external_link,
		height,
		image: _image,
		medium,
		name,
		original_sold,
		sections,
		width,
		year_of_creation,
	} = artwork;

	const image = stripWrapper(_image);

	return (
		<Layout {...layout}>
			<MetaData
				title={name}
				description={description}
				image={image}
				path={asPath}
			/>
			<Row>
				<Column md={6} align="end" justify="center">
					<NoWhitespaceImage
						image={image}
						priority
						loading="eager"
						style={{ height: "auto", maxWidth: "100%" }}
						sizes={generateImageBreakpoints({
							lg: 0.5,
							md: 0.5,
							sm: 1,
							xl: 0.5,
							xs: "100vw",
						})}
					/>
				</Column>
				<Column md={6} align="end">
					<Heading className={classes["title"]} type="h1">
						{name}
					</Heading>
					<Row>
						<Column sm={6} md={12} lg={6}>
							<StyledLink href={external_link}>
								Buy a print
							</StyledLink>
						</Column>
						<Column sm={6} md={12} lg={6} align="center">
							<Typography type="span">
								{!original_sold ? (
									<Fragment>
										Wanna buy the original?{" "}
										<Link
											href={`mailto:purchase@clarisclouds.com?subject=I%20want%20to%20buy%20${name}!&body=Hello!%0A%0A%0A%0ABest%20regards%2C%0A%0A`}
										>
											Message me about it!
										</Link>
									</Fragment>
								) : (
									<Fragment>
										The original has been sold
									</Fragment>
								)}
							</Typography>
						</Column>
					</Row>
				</Column>
			</Row>
			{[year_of_creation, height, width, medium].every(Boolean) && (
				<Row row-gap="none">
					<Column md={[8, 2]}>
						<Heading type="h2" look="h3">
							Specifications
						</Heading>
						<div className={classes["specifications"]}>
							<Labeler
								label={
									<Icon title="Dimensions" variant="ruler" />
								}
							>
								{width} × {height} cm
							</Labeler>
							<Labeler
								label={
									<Icon title="Material" variant="material" />
								}
							>
								{medium}
							</Labeler>
							<Labeler
								label={
									<Icon
										title="Year of creation"
										variant="calendar"
									/>
								}
							>
								{year_of_creation}
							</Labeler>
						</div>
					</Column>
				</Row>
			)}
			{description && (
				<Row>
					<Column md={[8, 2]}>
						<Typography size="large">{description}</Typography>
					</Column>
				</Row>
			)}
			<ComponentRenderer components={sections} />
			{latestArtworks && latestArtworks.length > 0 && (
				<Row>
					<Column>
						<Heading type="h2" look="h3">
							Latest artworks
						</Heading>
						<Gallery
							className={classes["gallery"]}
							artworks={latestArtworks as ArtworkSchema[]}
							fill={false}
							rows={{ defaultRow: 2, md: 4 }}
							renderChild={(artwork, i) => (
								<ArtworkLink
									artwork={artwork}
									key={i}
									imageProps={{
										priority: i <= 4,
										sizes: `${
											stripWrapper(artwork.image).width
										}px`,
										style: {
											height: "auto",
											maxWidth: "100%",
										},
									}}
								/>
							)}
						/>
					</Column>
				</Row>
			)}
		</Layout>
	);
};

export default ArtworkPage;

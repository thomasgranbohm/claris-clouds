import { Fragment } from "react";
import { useRouter } from "next/router";

import { getArtwork } from "api/artwork";

import Column from "components/Column";
import ComponentRenderer from "components/ComponentRenderer";
import Gallery from "components/Gallery";
import Heading from "components/Heading";
import Icon from "components/Icon";
import { NoWhitespaceImage } from "components/Image";
import Labeler from "components/Labeler";
import Layout from "components/Layout";
import Link, { StyledLink } from "components/Link";
import MetaData from "components/MetaData";
import Row from "components/Row";
import Typography from "components/Typography";

import classes from "styles/pages/ArtworkPage.module.scss";

import Artwork, { ArtworkPageSchema } from "types/api/artwork";
import { LayoutPage } from "types/components";

import getImageLink from "utils/getImageLink";
import getLayoutData from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getServerSideProps = getLayoutData<ArtworkPageProps>(
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

interface ArtworkPageProps {
	artwork: ArtworkPageSchema;
	latestArtworks: Pick<Artwork, "name" | "slug" | "image">[];
}

const ArtworkPage: LayoutPage<ArtworkPageProps> = ({
	artwork,
	latestArtworks,
	layout,
}) => {
	const { asPath } = useRouter();
	const {
		description,
		height,
		image: rawImage,
		medium,
		name,
		original_sold,
		redbubble_link,
		sections,
		width,
		year_of_creation,
	} = artwork;

	const image = stripWrapper(rawImage);

	return (
		<Layout {...layout}>
			<MetaData
				title={name}
				description={description}
				images={[
					{
						alt:
							image.caption ||
							image.alternativeText ||
							image.name,
						height: image.height,
						url: getImageLink(image),
						width: image.width,
					},
					...Object.values(image.formats).map(
						({ height, width, ...i }) => ({
							alt:
								image.caption ||
								image.alternativeText ||
								image.name,
							height,
							url: getImageLink(i),
							width,
						})
					),
				]}
				path={asPath}
			/>
			<Row>
				<Column lg={6} xl={[5, 1]} align="end" justify="end">
					<NoWhitespaceImage
						image={image}
						style={{ height: "auto", width: "100%" }}
						sizes="(max-width: 1024px) 100vw
						50vw"
					/>
				</Column>
				<Column lg={6} xl={5} align="end">
					<Heading type="h2">{name}</Heading>
					<div className={classes["purchase-actions"]}>
						<StyledLink href={redbubble_link}>
							Buy a print
						</StyledLink>
						<Typography type="span">
							{!original_sold ? (
								<Fragment>
									Wanna buy the original?{" "}
									<Link
										href={`mailto:clarisclouds@gmail.com?subject=I%20want%20to%20buy%20${name}!&body=Hello!%0A%0A%0A%0ABest%20regards%2C%0A%0A`}
									>
										Message me about it!
									</Link>
								</Fragment>
							) : (
								<Fragment>The original has been sold</Fragment>
							)}
						</Typography>
					</div>
				</Column>
			</Row>
			{[year_of_creation, height, width, medium].every(Boolean) && (
				<Row row-gap="none">
					<Column lg={[8, 2]}>
						<Heading type="h3" look="h4">
							Specifications
						</Heading>
						<div className={classes["specifications"]}>
							<Labeler label={<Icon variant="ruler" />}>
								{width} × {height} cm
							</Labeler>
							<Labeler label={<Icon variant="material" />}>
								{medium}
							</Labeler>
							<Labeler label={<Icon variant="calendar" />}>
								{year_of_creation}
							</Labeler>
						</div>
					</Column>
				</Row>
			)}
			{description && (
				<Row>
					<Column lg={[8, 2]}>
						<Typography size="large">{description}</Typography>
					</Column>
				</Row>
			)}
			<ComponentRenderer components={sections} />
			{latestArtworks && latestArtworks.length > 0 && (
				<Row>
					<Column>
						<Heading type="h3">Latest artworks</Heading>
						<Gallery
							artworks={latestArtworks as Artwork[]}
							gap={18}
							rows={{ defaultRow: 2, lg: 4 }}
							renderChild={({ image, slug }, i) => (
								<Link href={`/artwork/${slug}`} key={slug}>
									<NoWhitespaceImage
										image={image}
										priority={i <= 6}
										style={{
											height: "auto",
											maxWidth: "100%",
										}}
										sizes="100vw"
									/>
								</Link>
							)}
						/>
					</Column>
				</Row>
			)}
		</Layout>
	);
};

export default ArtworkPage;

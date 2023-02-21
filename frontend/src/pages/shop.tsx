import { useState } from "react";

import { getArtworks } from "api/artwork";

import { Column, Row } from "components/Grid";
import Heading from "components/Heading";
import { NoWhitespaceImage } from "components/Image";
import Layout from "components/Layout";
import { StyledLink } from "components/Link";
import MetaData from "components/MetaData";
import Typography from "components/Typography";

import { useObserver } from "hooks/useObserver";

import ArtworkSchema from "types/api/artwork";
import { PaginationSchema } from "types/api/strapi";
import { LayoutPage } from "types/components";

import { getLayoutDataSSG } from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getStaticProps = getLayoutDataSSG<GalleryPageProps>(async () => {
	const { data, error } = await getArtworks();

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
			artworks: stripWrapper(data.artworks),
			pagination: data.artworks.meta.pagination,
		},
	};
});

interface GalleryPageProps {
	artworks: ArtworkSchema[];
	pagination: PaginationSchema;
}

const GalleryPage: LayoutPage<GalleryPageProps> = ({
	artworks: _artworks,
	layout,
	pagination,
}) => {
	const [artworks, setArtworks] = useState<ArtworkSchema[]>(_artworks);

	const { ref } = useObserver(
		async () => {
			const newArtworks = await getArtworks(artworks.length);
			setArtworks([
				...artworks,
				...stripWrapper(newArtworks.data.artworks),
			]);
		},
		{
			stoppingCondition: pagination.total <= artworks.length,
		}
	);

	return (
		<Layout {...layout}>
			<MetaData title="Gallery" />
			{artworks.length > 0 &&
				artworks.map((artwork) => (
					<Row key={artwork.slug}>
						<Column md={6} lg={[4, 2]} align="center">
							<NoWhitespaceImage
								image={artwork.image}
								style={{
									aspectRatio: "1 / 1",
									height: "auto",
									maxWidth: "100%",
									objectFit: "cover",
									objectPosition: "center",
								}}
							/>
						</Column>
						<Column md={6} lg={4} align="center">
							<Heading type="h2">{artwork.name}</Heading>
							<Typography>{artwork.description}</Typography>
							<Row>
								<Column lg={8}>
									<StyledLink href={artwork.external_link}>
										Buy a print
									</StyledLink>
								</Column>
							</Row>
						</Column>
					</Row>
				))}
			<div ref={ref} aria-hidden />
		</Layout>
	);
};

export default GalleryPage;

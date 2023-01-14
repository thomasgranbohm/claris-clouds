import { useState } from "react";

import { getArtworks } from "api/artwork";

import ArtworkLink from "components/ArtworkLink";
import Column from "components/Column";
import Gallery from "components/Gallery";
import Layout from "components/Layout";
import MetaData from "components/MetaData";
import Row from "components/Row";

import { useObserver } from "hooks/useObserver";

import ArtworkSchema from "types/api/artwork";
import { PaginationSchema } from "types/api/strapi";
import { LayoutPage } from "types/components";

import getLayoutData from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getServerSideProps = getLayoutData<GalleryPageProps>(async () => {
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

	const ref = useObserver(
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
			<Row>
				<Column>
					<Gallery
						artworks={artworks}
						renderChild={(artwork, i) => (
							<ArtworkLink
								artwork={artwork}
								key={i}
								imageProps={{
									priority: i <= 6,
									sizes: "100vw",
									style: {
										height: "auto",
										maxWidth: "100%",
									},
								}}
							/>
						)}
					/>
					<div aria-hidden="true" ref={ref} />
				</Column>
			</Row>
		</Layout>
	);
};

export default GalleryPage;

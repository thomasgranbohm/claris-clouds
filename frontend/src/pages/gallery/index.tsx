import { GetServerSideProps, NextPage } from "next";

import { getArtworks } from "api/artwork";

import Gallery from "components/Gallery";
import Layout from "components/Layout";
import MetaData from "components/MetaData";

import Artwork from "types/api/artwork";
import { PaginationSchema } from "types/api/strapi";
import { LayoutPage } from "types/components";

import getLayoutData from "utils/getLayoutData";

export const getStaticProps = getLayoutData<GalleryPageProps>(async () => {
	const { data, error, meta } = await getArtworks({
		slug: ["id:desc"],
	});

	if (error) {
		if (error.status === 404) {
			return {
				notFound: true,
			};
		} else {
			throw error;
		}
	}

	return {
		props: {
			artworks: data.map(({ attributes, id }) => ({ ...attributes, id })),
			pagination: meta.pagination,
		},
	};
});

interface GalleryPageProps {
	artworks: Artwork[];
	pagination: PaginationSchema;
}

const GalleryPage: LayoutPage<GalleryPageProps> = ({ artworks, layout }) => {
	return (
		<Layout {...layout}>
			<MetaData title="Gallery" path="/gallery" />

			<Gallery artworks={artworks} />
		</Layout>
	);
};

export default GalleryPage;

import { GetServerSideProps, NextPage } from "next";

import { getArtworks } from "api/artwork";

import Gallery from "components/Gallery";
import Layout from "components/Layout";
import MetaData from "components/MetaData";

import Artwork from "types/api/artwork";
import { PaginationSchema } from "types/api/strapi";

export const getServerSideProps: GetServerSideProps<
	GalleryPageProps | Promise<GalleryPageProps>
> = async () => {
	const { data, error, meta } = await getArtworks();

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
};

interface GalleryPageProps {
	artworks: Artwork[];
	pagination: PaginationSchema;
}

const GalleryPage: NextPage<GalleryPageProps> = ({ artworks }) => {
	return (
		<Layout>
			<MetaData title="Gallery" path="/gallery" />

			<Gallery artworks={artworks} />
		</Layout>
	);
};

export default GalleryPage;

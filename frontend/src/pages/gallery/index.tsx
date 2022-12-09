import { getGallery } from "api/artwork";

import Gallery from "components/Gallery";
import Layout from "components/Layout";
import MetaData from "components/MetaData";

import Artwork from "types/api/artwork";
import { PaginationSchema } from "types/api/strapi";
import { LayoutPage } from "types/components";

import getLayoutData from "utils/getLayoutData";
import stripWrapper from "utils/stripWrapper";

export const getServerSideProps = getLayoutData<GalleryPageProps>(async () => {
	const { data, error } = await getGallery();

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

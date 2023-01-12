import { ReactNode, useCallback } from "react";

import { getArtworks } from "api/artwork";

import Column from "components/Column";
import Gallery from "components/Gallery";
import { StrapiImage } from "components/Image";
import Layout from "components/Layout";
import Link from "components/Link";
import MetaData from "components/MetaData";
import Row from "components/Row";

import Artwork from "types/api/artwork";
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
	artworks: Artwork[];
	pagination: PaginationSchema;
}

const GalleryPage: LayoutPage<GalleryPageProps> = ({ artworks, layout }) => {
	const renderChild = useCallback<(props: Artwork, i: number) => ReactNode>(
		({ image, slug }, i) => {
			return (
				<Link href={`/artwork/${slug}`} key={slug}>
					<StrapiImage
						image={image}
						priority={i <= 6}
						style={{
							height: "auto",
							maxWidth: "100%",
						}}
						sizes="100vw"
					/>
				</Link>
			);
		},
		[]
	);

	return (
		<Layout {...layout}>
			<MetaData title="Gallery" />
			<Row>
				<Column>
					<Gallery artworks={artworks} renderChild={renderChild} />
				</Column>
			</Row>
		</Layout>
	);
};

export default GalleryPage;

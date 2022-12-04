import { GetServerSideProps, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";

import { getArtwork, getArtworks } from "api/artwork";

import Button from "components/Button";
import Column from "components/Column";
import Heading from "components/Heading";
import Image from "components/Image";
import Layout from "components/Layout";
import Link from "components/Link";
import MetaData from "components/MetaData";
import Row from "components/Row";
import Typography from "components/Typography";

import Artwork from "types/api/artwork";
import { LayoutPage } from "types/components";

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
			if (error.statusCode === 404) {
				return {
					notFound: true,
				};
			} else {
				throw error;
			}
		}

		return {
			props: { artwork: stripWrapper(data.artwork) },
		};
	}
);

interface ArtworkPageProps {
	artwork: Artwork;
}

const ArtworkPage: LayoutPage<ArtworkPageProps> = ({ artwork, layout }) => {
	const { asPath } = useRouter();
	const {
		description,
		image: rawImage,
		name,
		original_sold,
		redbubble_link,
	} = artwork;

	const image = stripWrapper(rawImage);

	return (
		<Layout {...layout}>
			<MetaData
				title={name}
				description={description}
				images={[
					{
						alt: image.alternativeText,
						height: image.height,
						url: image.hash + image.ext,
						width: image.width,
					},
				]}
				path={asPath}
			/>
			<Row>
				<Column lg={6} align="end">
					<Image
						alt={image.alternativeText}
						height={image.height}
						layout="responsive"
						src={image.hash + image.ext}
						width={image.width}
					/>
				</Column>
				<Column lg={6} align="end">
					<Heading type="h2">{name}</Heading>
					<Row row-gap="none">
						<Column md={6} align="center">
							<Link href={redbubble_link} asWrapper>
								<Button>Buy a print</Button>
							</Link>
						</Column>
						<Column md={6} align="center">
							{!original_sold ? (
								<Typography>
									Wanna buy the original?{" "}
									<Link href="#">Message me about it!</Link>
								</Typography>
							) : (
								<Typography>
									The original has been sold
								</Typography>
							)}
						</Column>
					</Row>
				</Column>
			</Row>
			<Row>
				<Column sm={[8, 2]}>
					{description && (
						<Typography size="large">{description}</Typography>
					)}
				</Column>
			</Row>
		</Layout>
	);
};

export default ArtworkPage;

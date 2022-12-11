import { useRouter } from "next/router";

import { getArtwork } from "api/artwork";

import Button from "components/Button";
import Column from "components/Column";
import Heading from "components/Heading";
import Icon from "components/Icon";
import Image from "components/Image";
import Labeler from "components/Labeler";
import Layout from "components/Layout";
import Link from "components/Link";
import MetaData from "components/MetaData";
import Row from "components/Row";
import Typography from "components/Typography";

import classes from "styles/pages/ArtworkPage.module.scss";

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
			if (error.extensions.code === "STRAPI_NOT_FOUND_ERROR") {
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
		height,
		image: rawImage,
		medium,
		name,
		original_sold,
		redbubble_link,
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
						<Column md={8} lg={6} align="center">
							<Link href={redbubble_link} asWrapper>
								<Button>Buy a print</Button>
							</Link>
						</Column>
						<Column md={4} lg={6} align="center">
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
			<Row row-gap="none">
				<Column md={[10, 1]} lg={[6, 3]}>
					<Heading type="h4">Specifications</Heading>
				</Column>
				<Column
					md={[10, 1]}
					lg={[6, 3]}
					className={classes["specifications"]}
				>
					<Labeler label={<Icon variant="fullscreen" />}>
						{width} × {height} cm
					</Labeler>
					<Labeler label={<Icon variant="material" />}>
						{medium}
					</Labeler>
					<Labeler label={<Icon variant="calendar" />}>
						{year_of_creation}
					</Labeler>
				</Column>
			</Row>
			<Row>
				<Column md={[8, 2]}>
					{description && (
						<Typography size="large">{description}</Typography>
					)}
				</Column>
			</Row>
		</Layout>
	);
};

export default ArtworkPage;

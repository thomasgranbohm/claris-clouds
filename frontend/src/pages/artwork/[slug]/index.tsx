import {GetServerSideProps, NextPage } from "next";

import Layout from "components/Layout";

export const getServerSideProps: GetServerSideProps<
	ArtworkPageProps | Promise<ArtworkPageProps>
> = async () => {
	return {
		props: {},
	};
};

interface ArtworkPageProps {
	// Remove me
}

const ArtworkPage: NextPage<ArtworkPageProps> = () => {
	return <Layout>{/* Remove me*/}</Layout>;
};

export default ArtworkPage;

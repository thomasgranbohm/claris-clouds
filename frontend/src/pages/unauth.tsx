import LogoSVG from "assets/images/logo.svg";

import Heading from "components/Heading";
import MetaData from "components/MetaData";
import Typography from "components/Typography";

import classes from "styles/pages/UnauthPage.module.scss";

import { getLayoutDataSSG } from "utils/getLayoutData";

export const getStaticProps = getLayoutDataSSG();

const Unauthpage = () => {
	return (
		<main className={classes["container"]}>
			<MetaData
				defaultTitle="Clari's Clouds"
				description="Stay tuned..."
				canonical="/"
			/>
			<div className={classes["inner"]}>
				<LogoSVG
					className={classes["logo"]}
					alt="Clari's Clouds logo"
				/>
				<Heading className={classes["title"]} type="h1">
					Clari&apos;s Clouds
				</Heading>
				<Typography className={classes["description"]} size="larger">
					Stay tuned...
				</Typography>
			</div>
		</main>
	);
};

export default Unauthpage;

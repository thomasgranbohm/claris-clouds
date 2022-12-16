import { FC } from "react";

import Heading from "components/Heading";
import { StrapiImage } from "components/Image";

import { ImageSchema as TImage } from "types/api/strapi";
import { WithChildren } from "types/components";

import classes from "./Cover.module.scss";

interface CoverProps extends WithChildren {
	background: TImage;
}

const Cover: FC<CoverProps> = ({ background, children }) => {
	return (
		<div className={classes["container"]}>
			<div className={classes["background"]}>
				<StrapiImage image={background} fill priority />
			</div>
			<div className={classes["foreground"]}>
				<Heading className={classes["title"]} type="h1" color="white">
					{children}
				</Heading>
			</div>
		</div>
	);
};

export default Cover;

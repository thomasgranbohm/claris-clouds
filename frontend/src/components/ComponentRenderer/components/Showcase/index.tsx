import { FC } from "react";

import { ShowcaseSchema } from "types/sections";

import classes from "../../ComponentRenderer.module.scss";

const Showcase: FC<ShowcaseSchema> = ({ images }) => {
	return <div className={classes["showcase"]}></div>;
};

export default Showcase;

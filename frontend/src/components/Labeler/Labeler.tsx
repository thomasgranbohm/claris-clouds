import { FC, ReactNode } from "react";
import clsx from "clsx";

import Typography from "components/Typography";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Labeler.module.scss";

interface LabelerProps extends WithChildren, WithClassname {
	label: ReactNode;
	title?: string;
}

const Labeler: FC<LabelerProps> = ({ children, className, label }) => {
	return (
		<div className={clsx(classes["container"], className)}>
			<Typography
				className={clsx(
					classes["label"],
					typeof label === "string" && classes["needs-colon"]
				)}
			>
				{label}
			</Typography>
			<Typography className={classes["content"]}>{children}</Typography>
		</div>
	);
};

export default Labeler;

import { FC, ReactNode } from "react";
import clsx from "clsx";

import Heading from "components/Heading";

import { WithChildren, WithClassname } from "types/components";

import classes from "./StyledButton.module.scss";

interface StyledButtonProps extends WithClassname, WithChildren {}

const StyledButton: FC<StyledButtonProps> = ({ children, className }) => {
	return (
		<div className={clsx(classes["container"], className)}>
			<Heading className={classes["title"]} color="background" type="b">
				{children}
			</Heading>
		</div>
	);
};

export default StyledButton;

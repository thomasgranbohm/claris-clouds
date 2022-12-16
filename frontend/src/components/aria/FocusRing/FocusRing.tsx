import { FC } from "react";
import { FocusRing as AriaFocusRing, FocusRingProps } from "react-aria";

import classes from "./FocusRing.module.scss";

const FocusRing: FC<FocusRingProps> = ({ children }) => {
	return (
		<AriaFocusRing focusRingClass={classes["active"]}>
			{children}
		</AriaFocusRing>
	);
};

export default FocusRing;

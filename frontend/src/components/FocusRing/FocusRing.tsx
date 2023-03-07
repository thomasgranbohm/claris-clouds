import { FC, ReactElement } from "react";
import { FocusRing, useFocusRing as useAriaFocusRing } from "react-aria";

import classes from "./FocusRing.module.scss";

export const useFocusRing = () => {
	const { focusProps, isFocusVisible, isFocused } = useAriaFocusRing();

	return {
		focusProps,
		focusVisibleClass: isFocusVisible && classes["active"],
		isFocusVisible,
		isFocused,
	};
};

const HocusFocus: FC<{ children: ReactElement }> = ({ children }) => (
	<FocusRing focusRingClass={classes["active"]}>{children}</FocusRing>
);

export default HocusFocus;

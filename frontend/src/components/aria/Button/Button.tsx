import { FC, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import clsx from "clsx";

import FocusRing from "components/aria/FocusRing";

import { WithClassname } from "types/components";

import classes from "./Button.module.scss";

interface ButtonProps extends WithClassname, AriaButtonProps {
	activeClassName?: string;
}

const Button: FC<ButtonProps> = ({ activeClassName, className, ...props }) => {
	const ref = useRef(null);
	const { buttonProps, isPressed } = useButton(props, ref);

	return (
		<FocusRing>
			<button
				{...buttonProps}
				ref={ref}
				className={clsx(
					classes["container"],
					isPressed && activeClassName,
					className
				)}
			>
				{props.children}
			</button>
		</FocusRing>
	);
};

export default Button;

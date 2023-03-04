import {
	FC,
	forwardRef,
	ForwardRefRenderFunction,
	MutableRefObject,
	useRef,
} from "react";
import { AriaButtonProps, useButton } from "react-aria";
import clsx from "clsx";

import FocusRing from "components/FocusRing";
import Heading from "components/Heading";
import Typography from "components/Typography";

import { WithClassname } from "types/components";

import classes from "./Button.module.scss";

interface ButtonProps extends WithClassname, AriaButtonProps {
	activeClassName?: string;
}

export const StyledButton: FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<Button {...props}>
			<div className={classes["box"]}>
				<Heading className={classes["title"]} type="b">
					{children}
				</Heading>
			</div>
		</Button>
	);
};

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

Button.displayName = "Button";

export default Button;

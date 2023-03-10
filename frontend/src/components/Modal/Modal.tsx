import { FC, useRef } from "react";
import { OverlayTriggerState } from "react-stately";
import {
	AriaModalOverlayProps,
	Overlay,
	useModalOverlay,
} from "@react-aria/overlays";

import { WithChildren, WithClassname } from "types/components";

import classes from "./Modal.module.scss";

interface ModalProps
	extends WithChildren,
		WithClassname,
		AriaModalOverlayProps {
	state: OverlayTriggerState;
}

const Modal: FC<ModalProps> = ({ children, className, state, ...props }) => {
	const ref = useRef(null);
	const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

	return (
		<Overlay portalContainer={document.body}>
			<div {...underlayProps} className={classes["underlay"]}>
				<div {...modalProps} ref={ref} className={classes["modal"]}>
					{children}
				</div>
			</div>
		</Overlay>
	);
};

export default Modal;

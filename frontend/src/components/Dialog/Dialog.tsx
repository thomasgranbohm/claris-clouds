import { FC, useRef } from "react";
import { AriaDialogProps, useDialog } from "react-aria";

import { WithChildren, WithClassname } from "types/components";

interface DialogProps extends WithChildren, WithClassname, AriaDialogProps {}

const Dialog: FC<DialogProps> = ({ children, className, ...props }) => {
	const ref = useRef(null);
	const { dialogProps, titleProps } = useDialog({ ...props }, ref);

	return (
		<div {...dialogProps} ref={ref} className={className}>
			{children}
		</div>
	);
};

export default Dialog;

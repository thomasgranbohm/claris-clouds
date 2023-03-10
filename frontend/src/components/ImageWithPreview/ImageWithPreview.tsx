import { FC } from "react";
import { useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";
import { Image } from "@shopify/hydrogen-react";
import { Image as ShopifyImageType } from "@shopify/hydrogen-react/storefront-api-types";
import clsx from "clsx";

import Button from "components/Button";
import Dialog from "components/Dialog";
import Icon from "components/Icon";
import Modal from "components/Modal";

import { WithChildren, WithClassname } from "types/components";

import classes from "./ImageWithPreview.module.scss";

interface ImageWithPreviewProps
	extends WithClassname,
		WithChildren,
		OverlayTriggerProps {
	disabled?: boolean;
	image: ShopifyImageType;
}

const ImageWithPreview: FC<ImageWithPreviewProps> = ({
	children,
	className,
	disabled,
	image,
	...props
}) => {
	const state = useOverlayTriggerState(props);
	const { overlayProps, triggerProps } = useOverlayTrigger(
		{ type: "dialog" },
		state
	);

	return (
		<>
			<Button
				{...triggerProps}
				isDisabled={disabled}
				className={classes["open"]}
			>
				{/* eslint-disable-next-line jsx-a11y/alt-text */}
				{children}
			</Button>
			{state.isOpen && (
				<Modal {...props} isDismissable state={state}>
					<Dialog
						{...overlayProps}
						className={clsx(classes["dialog"], className)}
						role="dialog"
					>
						<Button
							className={classes["dismiss"]}
							onPress={state.close}
						>
							<Icon
								variant="x-mark"
								className={classes["icon"]}
							/>
						</Button>
						{/* eslint-disable-next-line jsx-a11y/alt-text */}
						<Image
							className={classes["preview"]}
							loaderOptions={{ scale: 3 }}
							data={image}
						/>
					</Dialog>
				</Modal>
			)}
		</>
	);
};

export default ImageWithPreview;

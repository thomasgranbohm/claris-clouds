import { FC } from "react";
import { useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";
import { Image as ShopifyImageType } from "@shopify/hydrogen-react/storefront-api-types";
import clsx from "clsx";

import Button from "components/Button";
import Dialog from "components/Dialog";
import Icon from "components/Icon";
import { ShopifyImage } from "components/Image/Image";
import Modal from "components/Modal";

import { WithChildren, WithClassname } from "types/components";

import classes from "./ImageWithZoom.module.scss";

interface ImageWithZoomProps
	extends WithClassname,
		WithChildren,
		OverlayTriggerProps {
	disabled?: boolean;
	image: ShopifyImageType;
}

const ImageWithZoom: FC<ImageWithZoomProps> = ({
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
				className={classes["open"]}
				isDisabled={disabled}
				aria-label="Open zoomed in image"
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
						{/* eslint-disable-next-line jsx-a11y/alt-text */}
						<ShopifyImage
							className={classes["preview"]}
							image={image}
						/>
						<Button
							className={classes["dismiss"]}
							onPress={state.close}
						>
							<Icon
								variant="x-mark"
								className={classes["icon"]}
							/>
						</Button>
					</Dialog>
				</Modal>
			)}
		</>
	);
};

export default ImageWithZoom;

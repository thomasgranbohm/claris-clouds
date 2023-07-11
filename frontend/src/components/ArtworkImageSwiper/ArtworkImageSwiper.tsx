import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Image } from "@shopify/hydrogen-react/storefront-api-types";
import clsx from "clsx";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import Button from "components/Button";
import Dialog from "components/Dialog";
import Icon from "components/Icon";
import { ShopifyImage } from "components/Image";
import Modal from "components/Modal";

import { useArtworkContext } from "contexts/ArtworkContext";

import { WithClassname } from "types/components";

import "swiper/css";

import classes from "./ArtworkImageSwiper.module.scss";

interface ArtworkImageSwiperProps extends WithClassname {
	images: Image[];
}

const ArtworkImageSwiper: FC<ArtworkImageSwiperProps> = ({
	className,
	images,
	...props
}) => {
	const { hasMultipleVariants, selectedVariant } = useArtworkContext();

	const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const [index, setIndex] = useState<number>(0);
	const [variantIndex, setVariantIndex] = useState<number | null>(null);

	const state = useOverlayTriggerState(props);
	const { overlayProps, triggerProps } = useOverlayTrigger(
		{ type: "dialog" },
		state
	);

	const selectedImages = useMemo(
		() =>
			hasMultipleVariants
				? [images[0], images[variantIndex !== null ? variantIndex : 1]]
				: images,
		[images, hasMultipleVariants, variantIndex]
	);

	useEffect(() => {
		if (selectedVariant && swiper) {
			const foundImage = images.findIndex(
				(image) =>
					image.altText && image.altText === selectedVariant?.sku
			);

			if (foundImage >= 0) {
				setVariantIndex(foundImage);
				setIndex(1);
			}
		} else {
			setIndex(0);
		}
	}, [selectedVariant, images, swiper]);

	useEffect(() => {
		if (swiper) {
			swiper.slideTo(index);
		}
	}, [index, swiper]);

	return (
		<div className={classes["container"]}>
			<Swiper
				slidesPerView="auto"
				spaceBetween={9}
				className={classes["swiper"]}
				grabCursor
				modules={[Navigation]}
				onSwiper={(swiper) => setSwiper(swiper)}
				onSlideChange={(_swiper) =>
					_swiper.activeIndex !== index &&
					setIndex(_swiper.activeIndex)
				}
			>
				{selectedImages.map((image, i) => (
					<SwiperSlide className={classes["slide"]} key={i}>
						{/*  eslint-disable-next-line jsx-a11y/alt-text */}
						<ShopifyImage
							image={image}
							priority
							sizes={
								"(min-width: 1470px) 750px, (min-width: 960px) 640px, (min-width: 768px) 750px, (min-width: 480px) 640px, 640px"
							}
							style={{
								height: "100%",
								objectFit: "cover",
								verticalAlign: "bottom",
								width: "100%",
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<div className={classes["buttons"]}>
				{selectedImages.length && (
					<Fragment>
						<Button
							aria-label="Previous image"
							className={clsx(
								classes["button"],
								classes["backward"]
							)}
							isDisabled={index === 0}
							onPress={() => setIndex(index - 1)}
						>
							<Icon
								className={classes["icon"]}
								variant="backward"
							/>
						</Button>
						<Button
							aria-label="Next image"
							className={clsx(
								classes["button"],
								classes["forward"]
							)}
							onPress={() => setIndex(index + 1)}
							isDisabled={index + 1 >= selectedImages.length}
						>
							<Icon
								className={classes["icon"]}
								variant="forward"
							/>
						</Button>
					</Fragment>
				)}
				<Button
					{...triggerProps}
					aria-label="Fullscreen"
					className={clsx(classes["button"], classes["fullscreen"])}
				>
					<Icon className={classes["icon"]} variant="zoom-in" />
				</Button>
			</div>
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
							image={images[index]}
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
		</div>
	);
};

export default ArtworkImageSwiper;

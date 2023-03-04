import { FC, useState } from "react";
import clsx from "clsx";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import Button from "components/Button";
import { Column, Row } from "components/Grid";
import Icon from "components/Icon";
import { StrapiImage } from "components/Image";

import useBreakpoint from "hooks/useBreakpoint";

import { Breakpoint } from "types/generics";
import { ShowcaseSchema } from "types/sections";

import generateImageBreakpoints from "utils/generateImageBreakpoints";
import stripWrapper from "utils/stripWrapper";

import "swiper/css";

import classes from "../../ComponentRenderer.module.scss";

const Showcase: FC<ShowcaseSchema> = ({ images }) => {
	const breakpoint = useBreakpoint();
	const [swiper, setSwiper] = useState<SwiperClass | null>(null);

	const strippedImages = stripWrapper(images);

	return (
		<Row>
			<Column>
				<div
					className={clsx(classes["container"], classes["showcase"])}
				>
					<Swiper
						slidesPerView="auto"
						spaceBetween={9}
						centeredSlides={Number(breakpoint) < Breakpoint.sm}
						loop={true}
						className={classes["swiper"]}
						grabCursor
						modules={[Navigation]}
						onSwiper={(swiper) => setSwiper(swiper)}
					>
						{strippedImages.map((image, i) => (
							<SwiperSlide className={classes["slide"]} key={i}>
								<StrapiImage
									image={image}
									sizes={generateImageBreakpoints({
										lg: "50vw",
										sm: "100vw",
										xl: "33vw",
									})}
									style={{
										height: "100%",
										maxWidth: "100%",
										objectFit: "contain",
										width: "auto",
									}}
								/>
							</SwiperSlide>
						))}
					</Swiper>
					<div className={classes["buttons"]}>
						<Button
							aria-label="Previous slide"
							className={clsx(
								classes["button"],
								classes["backward"]
							)}
							onPress={() => swiper && swiper.slidePrev()}
						>
							<Icon variant="backward" />
						</Button>
						<Button
							aria-label="Next slide"
							className={clsx(
								classes["button"],
								classes["forward"]
							)}
							onPress={() => swiper && swiper.slideNext()}
						>
							<Icon variant="forward" />
						</Button>
					</div>
				</div>
			</Column>
		</Row>
	);
};

export default Showcase;

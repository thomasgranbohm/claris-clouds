import { FC, useState } from "react";
import clsx from "clsx";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import Button from "components/aria/Button";
import Column from "components/Column";
import Icon from "components/Icon";
import { StrapiImage } from "components/Image";
import Row from "components/Row";

import useBreakpoint from "hooks/useBreakpoint";

import { Breakpoint } from "types/generics";
import { ShowcaseSchema } from "types/sections";

import stripWrapper from "utils/stripWrapper";

import "swiper/css";

import classes from "../../ComponentRenderer.module.scss";

const Showcase: FC<ShowcaseSchema> = ({ images }) => {
	const strippedImages = stripWrapper(images);

	const [swiper, setSwiper] = useState<SwiperClass | null>(null);

	const breakpoint = useBreakpoint();

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
									sizes="(max-width: 768px) 100vw,
									(max-width: 1200px) 50vw,
									33vw"
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

import { FC } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";

import Column from "components/Column";
import { StrapiImage } from "components/Image";
import Row from "components/Row";
import Typography from "components/Typography";

import { ShowcaseSchema } from "types/sections";

import stripWrapper from "utils/stripWrapper";

import "swiper/css";

import classes from "../../ComponentRenderer.module.scss";

const Showcase: FC<ShowcaseSchema> = ({ images }) => {
	const strippedImages = stripWrapper(images);

	// TODO: Use artworks instead

	return (
		<div className={clsx(classes["container"], classes["showcase"])}>
			<Swiper
				slidesPerView="auto"
				spaceBetween={9}
				centeredSlides={true}
				loop={true}
				className={classes["swiper"]}
			>
				{strippedImages.map((image, i) => (
					<SwiperSlide className={classes["slide"]} key={i}>
						<StrapiImage
							className={classes["image"]}
							image={image}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Showcase;

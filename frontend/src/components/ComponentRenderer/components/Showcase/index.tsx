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

	// TODO: Set correct sizes

	return (
		<Row>
			<Column>
				<div
					className={clsx(classes["container"], classes["showcase"])}
				>
					<Swiper
						slidesPerView="auto"
						spaceBetween={9}
						centeredSlides={true}
						loop={true}
						className={classes["swiper"]}
						grabCursor
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
				</div>
			</Column>
		</Row>
	);
};

export default Showcase;

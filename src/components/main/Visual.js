import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper';
import { Navigation } from 'swiper';
function Visual() {
	return (
		<figure className='myScroll on'>
			<Swiper
				spaceBetween={50}
				loop={true}
				slidesPerView={3}
				pagination={true}
				navigation={true}
				centeredSlides={true}
				grabCursor={true}
				modules={[Pagination, Navigation]}>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
				<SwiperSlide>Slide 5</SwiperSlide>
			</Swiper>
		</figure>
	);
}

export default Visual;

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const path = process.env.PUBLIC_URL;

function Visual() {
	const cursor = useRef(null);
	const mouseMove = (e) => {
		cursor.current.style.left = e.clientX + 'px';
		cursor.current.style.top = e.clientY + 'px';
	};

	useEffect(() => {
		window.addEventListener('mousemove', mouseMove);

		return () => window.removeEventListener('mousemove', mouseMove);
	}, []);
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
				{[0, 1, 2, 3, 4].map((num) => {
					return (
						<SwiperSlide
							key={num}
							onMouseEnter={() => {
								cursor.current.style = 'transform:scale(8)';
							}}
							onMouseLeave={() => {
								cursor.current.style = 'transform:scale(1)';
							}}>
							<video
								src={`${path}/img/vid${num + 1}.mp4`}
								loop
								autoPlay
								muted></video>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<div className='cursor' ref={cursor}></div>
		</figure>
	);
}

export default Visual;

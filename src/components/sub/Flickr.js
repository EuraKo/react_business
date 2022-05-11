import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';

function Flickr() {
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	const masonryOptions = {
		transitionDuration: '0.5s',
	};

	const key = 'df93661d16064f006391d9d061379d39';
	const num = 50;
	const interest_url = `https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
	const search_url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=ocean`;

	// wrapping 함수에 async키워드 추가
	const getFlickr = async (method) => {
		const method_interest = method;

		// 1. async await를 사용해서 데이터를 먼저불러오도록 처리
		await axios.get(method_interest).then((json) => {
			// console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});
		// 2. await를 통해 데이터를 다불러온다음 실행
		console.log('flickr데이터 호출끝! 화면출력 시작');
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		getFlickr(interest_url);
	}, []);

	return (
		<Layout name={'Flickr'} bg={`${path}/img/man1.jpg`}>
			{loading ? (
				<img className='loading' src={[path + 'img/loading.gif']} />
			) : null}
			<button
				onClick={() => {
					setLoading(true);
					frame.current.classList.remove('on');
					getFlickr(interest_url);
				}}>
				interest gallery
			</button>
			<button
				onClick={() => {
					setLoading(true);
					frame.current.classList.remove('on');
					getFlickr(search_url);
				}}>
				search gallery
			</button>
			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={masonryOptions}>
					{items.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
											alt=''
										/>
									</div>
									<h2>{item.title}</h2>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}

export default Flickr;

import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';

function Flickr() {
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [enableClick, setEnableClick] = useState(true);

	const masonryOptions = {
		transitionDuration: '0.5s',
	};

	// wrapping 함수에 async키워드 추가
	const getFlickr = async (opt) => {
		const key = 'df93661d16064f006391d9d061379d39';
		const num = opt.count;
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		let url = '';

		// 인수로 받은 객체의 타입이 interest먄 interest url반환
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
		}

		// 인수로 받은 객체의 타입이 search이면 tags값을 받아서 검색어의 데이터를 불러오는 url 반환
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}
		// 1. async await를 사용해서 데이터를 먼저불러오도록 처리
		await axios.get(url).then((json) => {
			// console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});
		// 2. await를 통해 데이터를 다불러온다음 실행
		console.log('flickr데이터 호출끝! 화면출력 시작');
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setEnableClick(true);
		}, 1000);
	};

	useEffect(() => {
		getFlickr({
			type: 'interest',
			count: 50,
		});
		/*  	getFlickr({
				type: 'search',
				count: 500,
        tags:'ocean'
			}); */
	}, []);

	return (
		<Layout name={'Flickr'} bg={`${path}/img/man1.jpg`}>
			{loading ? (
				<img className='loading' src={[path + 'img/loading.gif']} />
			) : null}
			<button
				onClick={() => {
					if (enableClick) {
						setEnableClick(false);
						setLoading(true);
						frame.current.classList.remove('on');
						getFlickr({
							type: 'interest',
							count: 50,
						});
					}
				}}>
				interest gallery
			</button>
			<button
				onClick={() => {
					if (enableClick) {
						setEnableClick(false);
						setLoading(true);
						frame.current.classList.remove('on');
						getFlickr({
							type: 'search',
							count: 50,
							tags: 'building',
						});
					}
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

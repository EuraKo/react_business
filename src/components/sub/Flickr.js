import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
const path = process.env.PUBLIC_URL;

function Flickr() {
	const frame = useRef(null);
	const [items, setItems] = useState([]);

	// wrapping 함수에 async키워드 추가
	const getFlickr = async () => {
		const method_interest = 'flickr.interestingness.getList';
		const key = 'df93661d16064f006391d9d061379d39';
		const num = 500;
		const url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;

		// 1. async await를 사용해서 데이터를 먼저불러오도록 처리
		await axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});

		// 2. await를 통해 데이터를 다불러온다음 실행
		console.log('flickr데이터 호출끝! 화면출력 시작');
		frame.current.classList.add('on');
	};

	useEffect(() => {
		getFlickr();
	}, []);

	return (
		<Layout name={'Flickr'} bg={`${path}/img/man1.jpg`}>
			<div className='frame' ref={frame}>
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
			</div>
		</Layout>
	);
}

export default Flickr;

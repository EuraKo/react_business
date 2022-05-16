import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons';

function Flickr() {
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
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
		const method_user = 'flickr.people.getPhotos';
		let url = '';

		// 인수로 받은 객체의 타입이 interest먄 interest url반환
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
		}

		// 인수로 받은 객체의 타입이 search이면 tags값을 받아서 검색어의 데이터를 불러오는 url 반환
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&user_id=${opt.user}`;
		}

		// 1. async await를 사용해서 데이터를 먼저불러오도록 처리
		await axios.get(url).then((json) => {
			if (json.data.photos.photo.length === 0) {
				alert('해당 검색어에 이미지가 없습니다.');
				return;
			}
			// console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});
		// 2. await를 통해 데이터를 다불러온다음 실행
		// console.log('flickr데이터 호출끝! 화면출력 시작');
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setEnableClick(true);
		}, 1000);
	};
	const showSearch = (e) => {
		const result = input.current.value.trim();

		// 입력된 결과값이 없으면 얼럿창
		if (!result) return alert('입력하세요');
		input.current.value = '';

		if (enableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');

			getFlickr({
				type: 'search',
				count: 50,
				tags: result,
			});
		}
	};
	useEffect(() => {
		getFlickr({
			type: 'user',
			user: '195406071@N05',
			count: 50,
		});
		// getFlickr({
		// 	type: 'interest',
		// 	count: 50,
		// });
		/*  	getFlickr({
				type: 'search',
				count: 500,
        tags:'ocean'
			}); */
	}, []);

	return (
		<>
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
								tags: 'glass building',
							});
						}
					}}>
					search gallery
				</button>
				<input
					type='text'
					ref={input}
					onKeyUp={(e) => {
						// 입력된 키보드값이 엔터가 아니면 함수종료
						if (e.key === 'Enter') showSearch();
					}}
				/>
				<button
					onClick={() => {
						showSearch();
					}}>
					search
				</button>
				<div className='frame' ref={frame}>
					<div className='searchBox'></div>
					<Masonry elementType={'div'} options={masonryOptions}>
						{items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												pop.current.open();
											}}>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt=''
											/>
										</div>
										<h2>{item.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt=''
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span
												onClick={(e) => {
													if (enableClick) {
														setEnableClick(false);
														setLoading(true);
														frame.current.classList.remove('on');
														getFlickr({
															type: 'user',
															count: 10,
															user: e.currentTarget.innerText,
														});
													}
												}}>
												{item.owner}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>
			<Popup ref={pop}>
				{items.length !== 0 ? (
					<>
						<img
							src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`}
							alt=''
						/>
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				) : null}
			</Popup>
		</>
	);
}

export default Flickr;

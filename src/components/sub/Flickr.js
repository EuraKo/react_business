import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';

function Flickr() {
	const { flickr } = useSelector((store) => store.flickrReducer);
	const dispatch = dispatch();
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	// saga로 전달해서 api에 있는 axios함수에 인수로 전달할 객체가 담길 state생성
	const [opt, setOpt] = useState({ type: 'interest', count: 100 });
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
	const [enableClick, setEnableClick] = useState(true);

	const masonryOptions = {
		transitionDuration: '0.5s',
	};

	// 데이터 호출 후 로딩 처리할 함수 따로 분리
	const endLoading = () => {
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

			// 검색 요청함수 호출 시
			// axios함수에 전달이 되야하는 옵션객체를 setOpt로 state변경
			// 해당 state가 변경될때마다 useEffect로 saga.js에 전달됨
			setOpt({
				type: 'search',
				count: 50,
				tag: result,
			});
			endLoading();
		}
	};

	useEffect(() => {
		//의존성 배열을 opt로 해서 추후 setOpt를 통해서 axios로 전달되야 되는 옵션객체값이 변경될때마다
		//액션객체로 변환되서 dispatch로 saga.js로 전달
		dispatch({ type: 'FLICKR_START', opt });
		//데이터 전달후 로딩처리하는 함수 호출
		endLoading();
	}, [opt]);

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
							setOpt({
								type: 'interest',
								count: 50,
							});
							endLoading();
							// getFlickr({
							// 	type: 'interest',
							// 	count: 50,
							// });
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
							setOpt({
								type: 'search',
								count: 50,
								tag: 'glass building',
							});
							endLoading();
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
						{flickr.map((item, idx) => {
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
														// user 버튼 클릭 시
														// axios함수에 전달이 되야하는 옵션객체를 setOpt로 state변경
														// 해당 state가 변경될때마다 useEffect로 saga.js에 전달됨
														setOpt({
															type: 'user',
															count: 50,
															user: e.currentTarget.innerText,
														});
														endLoading();
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
				{flickr.length !== 0 ? (
					<>
						<img
							src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`}
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

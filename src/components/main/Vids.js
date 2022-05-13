// 전역에 있는 데이터를 가져오는 훅
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';

function Vids() {
	// store는 redux/store.js 따라 들어가면된다.
	const vidData = useSelector((store) => store.youtubeReducer.youtube);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);
	// console.log(vidData); // 많이 찍히는 이유는 스크롤될떄마다 랜더링되기떄문 문제가아님

	return (
		<>
			<section id='vids' className='myScroll'>
				<h2>Recent Youtube</h2>
				<ul>
					{vidData.map((vid, idx) => {
						if (idx < 3) {
							return (
								<li
									key={idx}
									onClick={() => {
										setIndex(idx);
										pop.current.open();
									}}>
									<img src={vid.snippet.thumbnails.medium.url} alt='' />
								</li>
							);
						}
					})}
				</ul>
			</section>

			<Popup ref={pop}>
				{vidData.length !== 0 && (
					<>
						<iframe
							src={`https://www.youtube.com/embed/${vidData[index].snippet.resourceId.videoId}`}
							frameBorder='0'></iframe>
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				)}
			</Popup>
		</>
	);
}

export default Vids;

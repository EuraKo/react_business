// 전역에 있는 데이터를 가져오는 훅
import { useSelector } from 'react-redux';

function Vids() {
	// store는 redux/store.js 따라 들어가면된다.
	const vidData = useSelector((store) => store.youtubeReducer.youtube);
	// console.log(vidData); // 많이 찍히는 이유는 스크롤될떄마다 랜더링되기떄문 문제가아님

	return (
		<>
			<section id='vids' className='myScroll'>
				<h2>Recent Youtube</h2>
				<ul>
					{vidData.map((vid, idx) => {
						if (idx < 3) {
							return (
								<li key={idx}>
									<img src={vid.snippet.thumbnails.medium.url} alt='' />
								</li>
							);
						}
					})}
				</ul>
			</section>
		</>
	);
}

export default Vids;

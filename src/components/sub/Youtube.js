import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Youtube() {
	const pop = useRef(null);
	// 값을 할당하는거여서 let을 쓸필요가 없다.
	const [vids, setVids] = useState([]);
	///리스트의 순서를 다룰 state추가
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const playListId = 'PLlM8MQlXerevUPqRRrMpLJFOQRPtKP67s';
		const key = 'AIzaSyBmkrTuDWtAo4Y49kWA9tJVe6DvS6usIkA';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResult=${num}`;
		axios.get(url).then((json) => {
			// console.log(json);
			setVids(json.data.items);
		});
	}, []);
	const handleClick = (index) => {
		pop.current.open();
		setIndex(index);
	};
	// 제목 80자넘어갈시 말줄임표붙히기 본문은 250개 날짜 줄이기
	return (
		<>
			<Layout name='Youtube'>
				{vids.map((vid, idx) => {
					let tit = vid.snippet.title;
					let desc = vid.snippet.description;
					let date = vid.snippet.publishedAt;

					return (
						// article 클릭 시 클릭한 요소의 순서값인 idx값을 setIndex를 이용하여
						<article
							key={idx}
							//article클릭시 클릭한 요소의 순서값인 idx값을 setIndex를 이용하여 index state값 변경
							onClick={() => handleClick(idx)}>
							<div className='pic'>
								<img src={vid.snippet.thumbnails.standard.url} alt='' />
							</div>
							<h2>{tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
							<p>{desc.length > 150 ? desc.substr(0, 150) + '...' : desc}</p>
							<span>{date.split('T')[0]}</span>
						</article>
					);
				})}
			</Layout>
			{/* 팝업 열리고 닫히고 */}
			{/* 컴포넌트에는 참조가 불가는 하지만 popup.js에서 뺴오기해서 가능 */}
			<Popup ref={pop}>
				{vids.length !== 0 ? (
					<>
						<iframe
							//팝업이 호출될때 변경된 index순번의 vids state값의 데이터값이 팝업영상으로 출력
							src={`https://www.youtube.com/embed/${vids[index].snippet.resourceId.videoId}`}
							frameBorder='0'></iframe>
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				) : null}
			</Popup>
		</>
	);
}

export default Youtube;

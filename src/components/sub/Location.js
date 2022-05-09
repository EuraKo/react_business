import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location(props) {
	// window전역객체에서 kakao라는 이름으로 등록되어있는 객체를 비구조할당으로 직접 변수에 할당
	const { kakao } = window;
	const container = useRef(null);
	const options = {
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};
	// useEffect안의 map의 변수를 onClick에서 불러와서 쓰기위해 state로 저장한다
	const [map, setMap] = useState(null);

	useEffect(() => {
		console.log(container);

		// container만 쓰면 dom을 가져오지 않아 .current를 불러와야함
		const map = new kakao.maps.Map(container.current, options);
		// 캄포넌트가 처음 mount시 생성된 인스턴스 map값을 해당 컴포넌트에서 자유롭게 쓰면서 상태관리 하기 위해 map state로 옮겨담음
		setMap(map);
	}, []);

	return (
		<Layout name='Location'>
			<div id='map' ref={container}></div>
			{/* 버튼 클릭시 map  */}
			<button
				onClick={() => {
					map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
				}}>
				Traffic On
			</button>
			<button
				onClick={() => {
					map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
				}}>
				Traffix Off
			</button>
		</Layout>
	);
}

export default Location;

import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

const path = process.env.PUBLIC_URL;

function Location(props) {
	// window전역객체에서 kakao라는 이름으로 등록되어있는 객체를 비구조할당으로 직접 변수에 할당
	const { kakao } = window;
	// console.log(window);
	const container = useRef(null);
	const branch = useRef(null);

	const info = [
		{
			title: '삼성동 코엑스',
			latlng: new kakao.maps.LatLng(37.514084597899085, 127.05956418154705),
			imgSrc: `${path}/img/marker1.png`,
			imgSize: new kakao.maps.Size(233, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '광화문 정문',
			latlng: new kakao.maps.LatLng(37.574012, 126.976789),
			imgSrc: `${path}/img/marker2.png`,
			imgSize: new kakao.maps.Size(233, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '남산타워',
			latlng: new kakao.maps.LatLng(37.5511694, 126.9882266),
			imgSrc: `${path}/img/marker3.png`,
			imgSize: new kakao.maps.Size(233, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];

	// useEffect안의 map의 변수를 onClick에서 불러와서 쓰기위해 state로 저장한다
	const [map, setMap] = useState(null);
	const [mapInfo] = useState(info);
	const [traffic, setTraffic] = useState(false);
	const [index, setIndex] = useState(0);

	// setIndex
	useEffect(() => {
		// 컴포넌트가 재랜더링 될때마다 기존 맵안쪽에 내용을 비워줘야함 안그럼 휠할때 중첩되서 지저분해보임
		container.current.innerHTML = '';
		const options = {
			center: mapInfo[index].latlng, // 지도의 중심좌표
			level: 3, // 지도의 확대 레벨
		};
		// console.log(container);

		// container만 쓰면 dom을 가져오지 않아 .current를 불러와야함
		const map_instance = new kakao.maps.Map(container.current, options);
		// 캄포넌트가 처음 mount시 생성된 인스턴스 map값을 해당 컴포넌트에서 자유롭게 쓰면서 상태관리 하기 위해 map state로 옮겨담음
		setMap(map_instance);

		const markerPosition = mapInfo[index].latlng;
		const imageSrc = mapInfo[index].imgSrc; // 마커이미지의 주소입니다
		const imageSize = mapInfo[index].imgSize; // 마커이미지의 크기입니다
		const imageOption = mapInfo[index].imgPos;
		// 마커를 생성합니다

		var markerImage = new kakao.maps.MarkerImage(
			imageSrc,
			imageSize,
			imageOption
		);
		const marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImage,
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map_instance);

		// 버튼 활성화
		const branch_li = branch.current.querySelectorAll('li');
		for (const btn of branch_li) btn.classList.remove('on');
		branch_li[index].classList.add('on');

		// 지도에 컨트롤러 추가
		const mapTypeControl = new kakao.maps.MapTypeControl();
		map_instance.addControl(
			mapTypeControl,
			kakao.maps.ControlPosition.TOPRIGHT
		);

		// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
		const zoomControl = new kakao.maps.ZoomControl();
		map_instance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		const mapInit = () => {
			// console.log('마커 중앙위치');
			map_instance.setCenter(mapInfo[index].latlng);
		};

		// 브라우저가 리사이즈시 mapInfo호출
		// css에서 트랜지션을 all로걸면 마크가 먼저 반응후 트랜지션이 걸려 빠르게하면 가운데가 틀어지므로 트랜지션을 세부적으로 줘서 넓이값은 뺴줘야함
		// 전역객체는 모든 페이지에 다 적용되므로 사용에 주의
		window.addEventListener('resize', mapInit);

		return () => {
			// 해당 컴포넌트가 사라지면 전역이벤트인 window제거
			window.removeEventListener('resize', mapInit);
		};
	}, [index]);

	// setTraffic()
	useEffect(() => {
		// console.log(traffic);
		// 초기에 map이 null로 들어오기 때문에 먼저 있는지 판단을 해야한다.
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
	}, [traffic]);

	return (
		<Layout name='Location'>
			<div id='map' ref={container}></div>
			<span>토글 버튼 : </span>
			<button onClick={() => setTraffic(!traffic)}>
				{traffic ? 'traffic Off' : 'traffic ON'}
			</button>
			{/* 버튼 클릭시 map state에 담겨있는 인스턴스의 addOverlayMap함수 호출 */}
			<br />
			<span>따로따로 버튼 : </span>
			<button
				onClick={() => {
					map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
					setTraffic(true);
				}}>
				Traffic On
			</button>
			<button
				onClick={() => {
					map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
					setTraffic(false);
				}}>
				Traffix Off
			</button>
			<ul className='branch' ref={branch}>
				{mapInfo.map((item, idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)}>
							{item.title}
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Location;

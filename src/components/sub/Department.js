import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

const path = process.env.PUBLIC_URL;

function Department() {
	// [상태값, 상태값을 변경하는 함수] = useState(상태초기값)
	let [num, setNum] = useState(0);
	// 현재 useEffect의 의존성 배열은 비어있으므로
	useEffect(() => {
		// 컴포넌트가 생성시 한번만 실행
		console.log('컴포넌트 생성');
		axios.get(`${path}/DB/member.json`).then((json) => {
			const members = json.data.members;

			console.log(members);
		});

		// 컴포넌트 소멸시 한번만 실행
		return () => {
			console.log('department 소멸');
		};
	}, []);

	// useEffect의 의존성 배열이 num으로 지정되어 있으므로
	useEffect(() => {
		// num값이 변경될때마다 실행
		console.log(num);
	}, [num]);

	return (
		<Layout name='department'>
			<button onClick={() => setNum(num++)}>증가</button>
			<h1>{num}</h1>
		</Layout>
	);
}

export default Department;

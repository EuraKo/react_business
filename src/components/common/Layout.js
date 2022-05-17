import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const path = process.env.PUBLIC_URL;

function Layout(props) {
	const frame = useRef(null);
	const SubVisual = styled.figure`
		width: 100%;
		height: 300px;
		background: #bbb;
		opacity: 0;
		transition: 1s;
		background-image: url(${props.bg});
	`;
	useEffect(() => {
		//해당 컴포넌트 생성시 (mount)
		//frame.current.classList.remove('on');
		frame.current.classList.add('on');

		return () => {
			// unmount (cleanup 함수)
		};
	}, []);
	// console.log(props.bg);
	return (
		<section className={`content ${props.name}`} ref={frame}>
			{/* <SubVisual /> */}
			{/* <figure style={{ backgroundImage: `url(${props.bg})` }}></figure> */}
			<figure>
				<img src={`${path}/img/${props.img}`} alt='' />
			</figure>
			<div className='inner'>
				<h1>{props.name}</h1>
				{/* 해당 레이아웃 컴포넌트를 호출하는 부모컴포넌트의 자식 내용 출력 */}
				{props.children}
			</div>
		</section>
	);
}

export default Layout;

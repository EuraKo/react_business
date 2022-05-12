import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';

import Anime from '../../class/anime';
import { useRef, useEffect, useState } from 'react';

function Main() {
	const main = useRef(null);
	// const pos = []; // 자식의 상태값이 바뀌면 자꾸 리셋된다. state에 담아도 괜찮으나 리사이즈등 되면 계속 재랜더링 되면서 main이 재갱신되서 소비되는 비용이 너무 크다.
	// 그래서 참조를 걸어서 값을 넣어놓는 방식을 사용해야한다.
	const pos = useRef([]);
	const [index, setIndex] = useState(0);
	const [num, setNum] = useState(0); //얘가 useEffect에서 쓰이므로 콘솔이 2개씩 찍힌다.처음값고 인입했을때값

	// 현재 스크롤되는 값을 관리할 state추가
	const [scrolled, setScrolled] = useState(0);

	const getPos = () => {
		const secs = main.current.querySelectorAll('.myScroll');

		pos.current = [];
		for (const sec of secs) pos.current.push(sec.offsetTop);
	};
	const activation = () => {
		const base = -200;
		const scroll = window.scrollY;
		// 현재 스크롤되는 거리값을 scrolled state에 저장해서 관리
		setScrolled(scroll);

		const btns = main.current.querySelectorAll('.scroll_navi li');
		const secs = main.current.querySelectorAll('.myScroll');

		pos.current.map((pos, idx) => {
			if (scroll >= pos + base) {
				for (let i = 0; i < secs.length; i++) {
					btns[i].classList.remove('on');
					secs[i].classList.remove('on');
				}
				// for (const btn of btns) btn.classList.remove('on');
				// for (const sec of secs) sec.classList.remove('on');
				btns[idx].classList.add('on');
				secs[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		const secs = main.current.querySelectorAll('.myScroll');
		setNum(secs.length);
		getPos();
		// 윈도우는 js에서 생성되는 돔이 아니므로 그냥 받아온다.
		// removeEventListener는 선언적 함수만 적용된다. 익명함수를 써서 인수를 전달하면 안된다.
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		// cleanup 함수를 이용하여 다른 컴포넌트로 넘어가면 동작지우기
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	// 네비 버튼 클릭시 인덱스 값을 받아와서 애니메이션 주기
	useEffect(() => {
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[index],
			duration: 500,
		});
	}, [index]);
	return (
		<>
			<main ref={main}>
				<Header type={'main'} />
				<Visual />
				<News />
				<Pics scrolled={scrolled} start={pos.current[2]} />
				<Vids />
				<Btns setIndex={setIndex} num={num} />
			</main>
		</>
	);
}

export default Main;

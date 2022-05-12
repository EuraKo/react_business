import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';

import Anime from '../../class/anime';
import { useRef, useEffect } from 'react';

function Main() {
	const main = useRef(null);
	// const pos = []; // 자식의 상태값이 바뀌면 자꾸 리셋된다. state에 담아도 괜찮으나 리사이즈등 되면 계속 재랜더링 되면서 main이 재갱신되서 소비되는 비용이 너무 크다.
	// 그래서 참조를 걸어서 값을 넣어놓는 방식을 사용해야한다.
	const pos = useRef([]);

	const getPos = () => {
		const secs = main.current.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
	};
	useEffect(() => {
		getPos();
	}, []);
	return (
		<>
			<main ref={main}>
				<Header type={'main'} />
				<Visual />
				<News />
				<Pics />
				<Vids />
				<Btns />
			</main>
		</>
	);
}

export default Main;

import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';

import Anime from '../../class/anime';
import { useRef } from 'react';

function Main() {
	return (
		<>
			{/* 애니메이션 테스트 <div
				id='box'
				style={{
					width: 100,
					height: 100,
					backgroundColor: 'aqua',
					position: 'absolute',
					top: 300,
					left: 0,
					zIndex: 10,
				}}
				onClick={(e) => {
					new Anime(e.currentTarget, {
						prop: 'left',
						value: 300,
						duration: 500,
					});
				}}></div> */}
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Btns />
		</>
	);
}

export default Main;

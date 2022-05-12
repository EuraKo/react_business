function Pics(props) {
	// console.log(props.scrolled, props.start);
	const scrolled = props.scrolled;
	// 해당 섹션의 세로 위치값
	const start = props.start;
	// 양수면 기준점을 위로, 음수는 기준점을 아래로 내림
	const base = 300;
	const position = scrolled - start + base;

	return (
		<section id='pics' className='myScroll'>
			<h2
				style={
					// 보정된 현재 섹션의 위치값에 도달해야지 스타일값 연동
					position >= 0
						? { transform: `translateX(${position / 1.2}px)` }
						: null
				}>
				flickr
			</h2>
			<p
				style={
					position >= 0
						? {
								transform: `translateX(${position * 1.2}px) scale(${
									1 + position / 1000
								})`,
						  }
						: null
				}>
				flickr
			</p>
		</section>
	);
}

export default Pics;

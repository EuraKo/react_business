function Btns(props) {
	// 예제 =========================
	// 인수로 받은 숫자의 갯수만큼 iterable object 생성
	// 이터러블 객체 - 반복가능 객체 (for of로만 반복처리가능)
	const abc = Array(4).keys();
	console.log(abc);
	// for (const a of abc) console.log(a);
	const b = Array.from(abc);
	console.log(b);
	// ============================
	const arr = Array.from(Array(props.num).keys());
	return (
		<ul className='scroll_navi'>
			{arr.map((_, idx) => {
				let active = '';
				idx === 0 ? (active = 'on') : (active = '');

				return (
					<li
						key={idx}
						className={active}
						onClick={() => props.setIndex(idx)}></li>
				);
			})}
		</ul>
	);
}

export default Btns;
/* 
 숫자값을 가지고 해당 숫자의 갯수만큼 배열생성
*/

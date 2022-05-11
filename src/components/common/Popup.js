import { forwardRef, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. 기존의 컴포넌트 함수를 대입형 함수(화살표함수)로 변경하고
// 2. 해당 화살표 함수를 forwardRef()로 wrapping
// 3. forwardRef에 두번쨰 인수로 ref추가
const Popup = forwardRef((props, ref) => {
	//4. 자신의 오픈 여부를 결정하는 state생성
	const [open, setOpen] = useState(false);
	// 해당 컴포넌트에서 만들어진 함수를 부모 컴포넌트에서 사용가능하도록 외부로 반환가능
	console.log(ref);
	//해당 컴포넌트를 forwardRef로 감싸서
	// useImperativeHandle함수로 state변경함수를 내보냄
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true), //팝업여는 함수
			close: () => setOpen(false), //팝업닫는 함수
		};
	});

	console.log(props);
	return (
		<>
			{/* open 일 떄만 동작 삼항연산자처럼 null을 안써도된다. */}
			{open && (
				// AnimatePresence : 해당 컴포넌트가 사라진떄도 모션처리 가능하게 설정
				<AnimatePresence>
					<motion.aside
						className='pop'
						initial={{ opacity: 0, scale: 0 }} // 초기상태
						animate={{ opacity: 1, transition: { duration: 1 }, scale: 1 }} // 해당 컴포넌트 생성될때
						exit={{ opacity: 0, scale: 0 }} // 해당 컴포넌트 소멸될때
					>
						<motion.div
							className='con'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 1 } }}
							exit={{ opacity: 0 }}>
							{props.children}
						</motion.div>
						{/* <span
							className='close'
							onClick={() => {
								setOpen(false);
							}}>
							close
						</span> */}
					</motion.aside>
				</AnimatePresence>
			)}
		</>
	);
});

export default Popup;

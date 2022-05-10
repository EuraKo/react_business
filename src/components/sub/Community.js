import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

/* 
c - creat 데이터생성
r - read 데이터 저장
u - update 데이터 수정
d - delete 데이터 삭제
*/

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);

	// 로컬 저장소에서 데이터를 받아와서 json형태로 변환
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		// 문자열로 들어가있는 데이터를 json형태로 바꿔준다음 반환한다.
		return JSON.parse(data);
	};
	// const [posts, setPosts] = useState(dummyPosts);
	const [posts, setPosts] = useState(getLocalData);
	// 중복수정을 막을 state
	const [allowed, setAllowed] = useState(true);

	// 입력버튼클릭시
	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			alert('제목과 본문을 입력하세요');
			return;
		}
		setPosts([
			{ title: input.current.value, content: textarea.current.value },
			...posts,
		]);
		resetPost();
	};

	// 초기화버튼
	const resetPost = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const deletePost = (index) => {
		// filter는 기존 배열을 반복을 돌면서 특정 조건에 부합되는 값만 리턴
		// _는 값이 안쓰임을 나타내는 개발자들간의 약속
		// setPosts(posts.filter((_, idx) => idx !== index));
		setPosts(
			posts.filter((_, idx) => {
				// 리스트를 다시 만드는 것이므로 일치하지 않는 것을 다시 배열로 만드는것
				return idx !== index;
			})
		);
	};

	// 수정버튼 클릭시 실행되는 함수
	// 클릭한 버튼의 포스트 순번을 파라미터로 전달
	const enableUpdate = (index) => {
		// 처음 수정모드 진입시 수정버튼 클릭 방지
		setAllowed(false);
		setPosts(
			//기존 배열값을 반복돌면서 인수로 전달된 순번과 현재 반복도는 순번이 같은 포스트만 찾아서
			//enableUpdate:true라는 값을 추가한뒤 setPosts로 기존 state값 변경
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	// 다시 출력모드로 변경하는 함수
	const disableUpdate = (index) => {
		// 출략모드 진입시 수정버튼 클릭 가능
		setAllowed(true);
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};
	// post 수정 함수
	const updatePost = (index) => {
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
			alert('수정할 내용과 본문을 입력하세요');
		}
		// 수정완료시 수정버튼 클릭 가능
		setAllowed(true);
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
	};

	//posts 값이 변경될때마다 콘솔로 출력
	useEffect(() => {
		// post값이 변경될 때마다 해당 state를 문자열로 변환해서 로컬 저장소에 저장
		// storage는 문자열로 바꿔야 들어가서 JSON.stringify를 줘야한다.
		localStorage.setItem('post', JSON.stringify(posts));
	}, [posts]);

	return (
		<Layout name='Community'>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea
					cols='30'
					rows='10'
					placeholder='본문을 입력하세요'
					ref={textarea}></textarea>
				<br />
				<button onClick={resetPost}>cancle</button>
				<button onClick={createPost}>create</button>
			</div>
			<div className='showBox'>
				{posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								// 수정모드
								<>
									<input
										type='text'
										defaultValue={post.title}
										ref={editInput}
									/>
									<br />
									<textarea
										cols='30'
										rows='10'
										defaultValue={post.content}
										ref={editTextarea}></textarea>

									<div className='btns'>
										<button onClick={() => disableUpdate(idx)}>cancle</button>
										<button onClick={() => updatePost(idx)}>save</button>
									</div>
								</>
							) : (
								// 출력모드
								<>
									<h2>{post.title}</h2>
									<p>{post.content}</p>

									<div className='btns'>
										{/* 수정 버튼 클릭시 enableUpdate호출하면서 인수로 수정할 post순번 전달 */}
										<button
											onClick={() => {
												// allowed값이 true일때만 수정모드 진입
												if (allowed) enableUpdate(idx);
											}}>
											edit
										</button>
										<button onClick={() => deletePost(idx)}>delete</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;

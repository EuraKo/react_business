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

	const dummyPosts = [
		{ title: 'Hello2', content: 'Here comes description in detail.' },
		{ title: 'Hello1', content: 'Here comes description in detail.' },
	];

	const [posts, setPosts] = useState(dummyPosts);

	// 입력버튼클릭시
	const createPost = () => {
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
		setPosts(posts.filter((_, idx) => idx !== index));
	};

	// 수정버튼 클릭시 실행되는 함수
	// 클릭한 버튼의 포스트 순번을 파라미터로 전달
	const enableUpdate = (index) => {
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
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};
	// post 수정 함수
	const updatePost = (index) => {
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
		console.log(posts);
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
										<button onClick={() => enableUpdate(idx)}>edit</button>
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

import { useState, useEffect } from 'react';

function News() {
	const getLocalData = () => {
		const dummyPosts = [
			{ title: 'Hello2', content: 'Here comes description in detail.' },
			{ title: 'Hello1', content: 'Here comes description in detail.' },
			{ title: 'Hello3', content: 'Here comes description in detail.' },
			{ title: 'Hello4', content: 'Here comes description in detail.' },
			{ title: 'Hello5', content: 'Here comes description in detail.' },
			{ title: 'Hello6', content: 'Here comes description in detail.' },
		];
		const data = localStorage.getItem('post');
		if (data) {
			return JSON.parse(data);
		} else {
			return dummyPosts;
		}
	};
	const [posts] = useState(getLocalData);

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(posts));
	}, []);

	return (
		<section id='news'>
			<h1>Recent News</h1>
			{/* post 값 중에서 최근글 3개만 출력 */}
			{posts.map((post, idx) => {
				if (idx < 3) {
					return (
						<li key={idx}>
							<h2>{post.title}</h2>
							<p>{post.content}</p>
						</li>
					);
				}
			})}
		</section>
	);
}

export default News;

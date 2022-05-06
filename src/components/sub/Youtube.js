import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Youtube() {
	const [vids, setVids] = useState([]);
	useEffect(() => {
		const playListId = 'PLlM8MQlXerevUPqRRrMpLJFOQRPtKP67s';
		const key = 'AIzaSyBmkrTuDWtAo4Y49kWA9tJVe6DvS6usIkA';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResult=${num}`;
		axios.get(url).then((json) => {
			console.log(json);
			setVids(json.data.items);
		});
	}, []);
	return (
		<Layout name='Youtube'>
			{vids.map((vid, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={vid.snippet.thumbnails.standard.url} alt='' />
						</div>
						<h2>{vid.snippet.title}</h2>
						<p>{vid.snippet.description}</p>
						<span>{vid.snippet.publishedAt}</span>
					</article>
				);
			})}
		</Layout>
	);
}

export default Youtube;

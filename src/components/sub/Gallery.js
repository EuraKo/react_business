import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
	const [pics, setPics] = useState([]);
	useEffect(() => {
		const method_interest = 'flickr.interestingness.getList';
		const key = 'df93661d16064f006391d9d061379d39';
		const num = 5;
		const url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;

		axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setPics(json.data.photos.photo);
		});
	}, []);
	return (
		<>
			<Layout name='Gallery'>
				<ul>
					{pics.map((pic, idx) => {
						return (
							<li key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
											alt=''
										/>
									</div>
									<p>{pic.title}</p>
									<div className='profile'>
										<img
											src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
											alt=''
										/>
										<span>{pic.owner}</span>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</Layout>
			;
		</>
	);
}

export default Gallery;

import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
const path = process.env.PUBLIC_URL;

function Department() {
	console.log('department render');
	const [members, setMembers] = useState([]);

	useEffect(() => {
		axios.get(`${path}/DB/member.json`).then((json) => {
			console.log(json.data.members);
			setMembers(json.data.members);
		});
	}, []);

	return (
		<Layout name={'Department'}>
			<button
				onClick={() => {
					const newMembers = [...members];
					newMembers[0].name = 'Emma';
					setMembers(newMembers);
				}}>
				정보변경
			</button>

			<ul className='memberList'>
				{members.map((member, idx) => {
					return (
						<li key={idx}>
							<div className='inner'>
								<img src={`${path}/img/${member.pic}`} />
								<h2>{member.name}</h2>
								<p>{member.position}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Department;

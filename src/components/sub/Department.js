import Layout from '../common/Layout';
import { useSelector } from 'react-redux';
const path = process.env.PUBLIC_URL;

function Department() {
	const members = useSelector((store) => store.memberReducer.members);

	return (
		<Layout name={'Department'}>
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

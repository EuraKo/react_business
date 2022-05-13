import { useSelector } from 'react-redux';
const path = process.env.PUBLIC_URL;

function Member() {
	const memberData = useSelector((store) => store.memberReducer.members);
	console.log(memberData);

	return (
		<section id='member' className='myScroll'>
			<h2>Recent Members</h2>
			<ul>
				{/* {memberData.map((member, idx) => {
					if (idx < 6) {
						return (
							<li key={idx}>
								<img src={`${path}/img/${member.pic}`} alt='' />
								<div className='name'>{member.name}</div>
							</li>
						);
					}
				})} */}
			</ul>
		</section>
	);
}

export default Member;

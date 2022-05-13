import { useSelector } from 'react-redux';
const path = process.env.PUBLIC_URL;

function Footer() {
	const members = useSelector((store) => store.memberReducer.members);
	console.log(members);
	return (
		<footer>
			<div className='inner'>
				<p>2022 DCODELAB &copy; ALL RIGHTS RESERVED.</p>
				<div className='members'>
					{members.map((member, idx) => {
						return <img key={idx} src={`${path}/img/${member.pic}`} alt='' />;
					})}
				</div>
			</div>
		</footer>
	);
}

export default Footer;

import { useSelector } from 'react-redux';
const path = process.env.PUBLIC_URL;

function Footer() {
	const members = useSelector((store) => store.memberReducer.members);

	return (
		<footer>
			<div className='inner'>
				<p>2022 DCODELAB &copy; ALL RIGHTS RESERVED.</p>
				<div className='members'>
					{members.map((member, idx) => (
						<img key={idx} src={`${path}/img/${member.pic}`} />
					))}
				</div>
			</div>
		</footer>
	);
}

export default Footer;

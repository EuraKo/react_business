import { NavLink } from 'react-router-dom';
import {
	useState,
	forwardRef,
	useImperactiveHandle,
	useImperativeHandle,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});
	return (
		<AnimatePresence>
			{open && (
				<motion.nav
					initial={{ x: -200, opacity: 0 }}
					animate={{
						x: 0,
						opacity: 1,
						transition: { type: 'spring', bounce: 0.5 },
					}}
					exit={{ x: -200, opacity: 0 }}>
					<h1>
						<NavLink exact to='/'>
							LOGO
						</NavLink>
					</h1>
					<ul id='gnb'>
						<li>
							<NavLink to='/Department'>Department</NavLink>
						</li>
						<li>
							<NavLink to='/Community'>Community</NavLink>
						</li>
						<li>
							<NavLink to='/Youtube'>Youtube</NavLink>
						</li>
						<li>
							<NavLink to='/Gallery'>Gallery</NavLink>
						</li>
						<li>
							<NavLink to='/Location'>Location</NavLink>
						</li>
						<li>
							<NavLink to='/Join'>Join</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;

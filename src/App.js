import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// main
import Main from './components/main/Main';

//sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Flickr from './components/sub/Flickr';

import './scss/style.scss';

function App() {
	//루트 컴포넌트인 App에서 youtube data를 가져와서 전역 store에 저장하는 함수
	const dispatch = useDispatch();

	useEffect(() => {
		// App에서 옵션객체를 전달해서 초기 flickr데이터 store전달
		dispatch({
			type: types.FLICKR.start,
			opt: { type: 'interest', count: 100 },
		});
		// 유투브 액션 객체 saga.js에 전달
		dispatch({ type: types.YOUTUBE.start });
		dispatch({ type: types.MEMBERS.start });
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main}></Route>
				{/* prop을 인수로 전달할때는 render로 전달해야한다 component는 페이지를 넘길때마다 재호출을 하기때문에 */}
				{/* <Route path='/' component={() => <Header type={'sub'} />} /> */}
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>
			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/Flickr' component={Flickr}></Route>
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />

			<Footer />
		</>
	);
}

export default App;

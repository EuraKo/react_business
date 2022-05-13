import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setYoutube } from './redux/action';

import axios from 'axios';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// main
import Main from './components/main/Main';

//sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Flickr from './components/sub/Flickr';

import './scss/style.scss';

function App() {
	//루트 컴포넌트인 App에서 youtube data를 가져와서 전역 store에 저장하는 함수
	const dispatch = useDispatch();

	const fetchYoutube = async () => {
		const playListId = 'PLlM8MQlXerevUPqRRrMpLJFOQRPtKP67s';
		const key = 'AIzaSyBmkrTuDWtAo4Y49kWA9tJVe6DvS6usIkA';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResult=${num}`;

		await axios.get(url).then((json) => {
			// 액시오스로 받아온 데이터를 setYoutube함수로 action 객체를 반환하고
			// 반환된 action객체를 dispatch로 reducer에 전달
			const action = setYoutube(json.data.items);
			console.log(action);
			dispatch(action);
		});
	};

	// 해당 컴포넌트가 마운드되면 store에 데이터 저장
	useEffect(() => {
		fetchYoutube();
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
			<Route path='/gallery' component={Gallery} />
			<Route path='/Flickr' component={Flickr}></Route>
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />

			<Footer />
		</>
	);
}

export default App;

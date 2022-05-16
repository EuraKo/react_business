import { combineReducers } from 'redux';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };

		default:
			return state;
	}
};

// reducer의 state인수값은 항상 객체가 들어와야한다 그래서 배열도 객체로 감싼다. youtube 경우 불특정한 객체가 들어와야하므로 빈배열로 넣어준다.
const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };

		default:
			return state;
	}
};
const galleryReducer = (state = { gallery: [] }, action) => {
	switch (action.type) {
		case 'SET_GALLERY':
			return { ...state, gallery: action.payload };

		default:
			return state;
	}
};
const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case 'FLICKR_START':
			return { ...state };

		case 'FLICKR_SUCCESS':
			return { ...state, flickr: action.payload };

		case 'FLICKR_ERROR':
			return { ...state, error: action.payload };

		default:
			return state;
	}
};
/* 
만약 값이 안들어 왔을 경우 미리 값을 지정. 최신 문법임
function plus(num1 = 1, num2 = 3) {
	console.log(num1 + num2);
}
plus(); */

const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
	galleryReducer,
	flickrReducer,
});

export default reducers;

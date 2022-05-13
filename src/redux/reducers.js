import { combineReducers } from 'redux';

const initMember = {
	members: [
		{
			name: 'julia',
			position: 'CEO',
			pic: 'man1.jpg',
		},
		{
			name: 'Paul',
			position: 'Vice Pres',
			pic: 'man2.jpg',
		},
		{
			name: 'Emily',
			position: 'Design',
			pic: 'man3.jpg',
		},
		{
			name: 'David',
			position: 'Front-end Developer',
			pic: 'man4.jpg',
		},
	],
};

const memberReducer = (state = initMember, action) => {
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
/* 
만약 값이 안들어 왔을 경우 미리 값을 지정. 최신 문법임
function plus(num1 = 1, num2 = 3) {
	console.log(num1 + num2);
}
plus(); */

const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
});

export default reducers;

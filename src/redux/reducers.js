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

/* 
만약 값이 안들어 왔을 경우 미리 값을 지정 
function plus(num1 = 1, num2 = 3) {
	console.log(num1 + num2);
}
plus(); */

const reducers = combineReducers({
	memberReducer,
});

export default reducers;

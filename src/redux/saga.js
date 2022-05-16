import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchYoutube, fetchMembers } from './api';

/* 
 takeLatest : 데이터 변경(action) 요청이 여러번 들어오면 제일 최근 요청 하나만 실행(takeEvery: 들어오는 요청 모두 처리)
 all : 여러개 함수를 한번에 처리
 call : 특정함수를 동기적으로 호출(api요청시 주로 사용, 두번쨰 인수값으로 받은 내용을 첫번째 인수로 받은 함수에 적용)
 fork : 특정함수를 비동기적으로 호출
 put : reducer에 action객체를 전달하는 기능(dispatch랑 동일)
*/

// 컴포넌트에서 받은 인수값을 api.js에 있는 엑시오스함수에 연결하는 함수
// flickr 관련 action 생성함수
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		// 해당 api호출이 실패했을때 예외처리
		// 에러 내용을 reducer에 전달
		yield put({ type: 'FLICKR_ERROR', payload: err });
	}
}

// 요청 받은 액션 타입에 따라 함수 호출
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

// youtube 관련 action 생성함수
export function* returnYoutube(action) {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: 'YOUTUBE_SUCCESS', payload: response.data.items });
	} catch (err) {
		yield put({ type: 'YOUTUBE_ERROR', payload: err });
	}
}

export function* callYoutube() {
	yield takeLatest('YOUTUBE_START', returnYoutube);
}
// member 관련 action 생성함수
export function* returnMembers(action) {
	try {
		const response = yield call(fetchMembers);
		yield put({ type: 'MEMBERS_SUCCESS', payload: response.data.members });
	} catch (err) {
		yield put({ type: 'MEMBERS_ERROR', payload: err });
	}
}

export function* callMembers() {
	yield takeLatest('MEMBERS_START', returnMembers);
}
// reducer에 적용될 rootSaga 생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube), fork(callMembers)]);
}

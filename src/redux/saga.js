import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr } from './api';

/* 
 takeLatest : 데이터 변경(action) 요청이 여러번 들어오면 제일 최근 요청 하나만 실행(takeEvery: 들어오는 요청 모두 처리)
 all : 여러개 함수를 한번에 처리
 call : 특정함수를 동기적으로 호출(api요청시 주로 사용, 두번쨰 인수값으로 받은 내용을 첫번째 인수로 받은 함수에 적용)
 fork : 특정함수를 비동기적으로 호출
 put : reducer에 action객체를 전달하는 기능(dispatch랑 동일)
*/

// 컴포넌트에서 받은 인수값을 api.js에 있는 엑시오스함수에 연결하는 함수
export function* returnFlickr(action) {
	const response = yield call(fetchFlickr, action.opt);
	// console.log(response);
	yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
}

// 요청 받은 액션 타입에 따라 함수 호출
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

// reducer에 적용될 rootSaga 생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}

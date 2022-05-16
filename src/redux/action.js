// 인수로 전달된 값을 type이 SET_MEMBERS인 액션 객체를 반환하는 함수
export const setMembers = (member) => {
	return {
		type: 'SET_MEMBERS', // 어떤데이터를 변경할건 지 인지
		payload: member, //수하물, 데이터
	};
};

export const setYoutube = (data) => {
	return {
		type: 'SET_YOUTUBE',
		payload: data,
	};
};
export const setFlickr = (data) => {
	return {
		type: 'SET_FLICKR',
		payload: data,
	};
};

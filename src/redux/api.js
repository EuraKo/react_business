import axios from 'axios';
const path = process.env.PUBLIC_URL;

export const fetchFlickr = async (opt) => {
	const key = 'df93661d16064f006391d9d061379d39';
	const num = opt.count;
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	let url = '';
	// console.log(opt);
	if (opt.type === 'interest') {
		url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
	}

	if (opt.type === 'search') {
		url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=${opt.tag}`;
	}
	if (opt.type === 'user') {
		url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&user_id=${opt.user}`;
	}

	// 해당 axios로 받아온 결과값을 saga.js에서 데이터를 가공하거나 분기처리 할 예정이므로 axios로 받아온 결과값만 리턴
	return await axios.get(url);
};
export const fetchYoutube = async () => {
	const playListId = 'PLlM8MQlXerevUPqRRrMpLJFOQRPtKP67s';
	const key = 'AIzaSyBmkrTuDWtAo4Y49kWA9tJVe6DvS6usIkA';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResult=${num}`;

	return await axios.get(url);
};
export const fetchMembers = async () => {
	const url = path + '/DB/member.json';
	return await axios.get(url);
};

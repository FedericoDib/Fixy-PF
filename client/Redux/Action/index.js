import axios from 'axios';
const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const GET_ALL = 'GET_ALL';

import db from '../../db.hardcode.json';

export const googleLogin = (id) => {
	return async (dispatch) => {
    console.log('hola1')
		let response = await axios.get(
			`http://192.68.40.173:3000/userInfo?id=${id}`
		);
		return dispatch({
			type: GOOGLE_LOGIN,
			payload: response.data,
		});
	};
	// return function (dispatch) {
	// 	console.log('hola1');
	// 	return axios
	// 		.get(`http://192.68.40.173:3000/userInfo?id=${id}`)
	// 		.then((response) =>
	// 			dispatch({
	// 				type: GOOGLE_LOGIN,
	// 				payload: response.data,
	// 			})
	// 		)
	// 		.catch((err) => console.error(err));
	// };
};

// export const getAllProfessionals = () => {
//   return async (dispatch) => {
//     const info = await axios.get("http://192.168.0.11:3000/type/all");
//     return dispatch({
//       type: GET_ALL,
//       payload: db.professional
//     });
//   };
// };

export const getAllProfessionalsJson = () => {
	return {
		type: GET_ALL,
		payload: db.professional,
	};
};

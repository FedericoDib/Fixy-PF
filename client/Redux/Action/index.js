import axios from 'axios';
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const GET_ALL = 'GET_ALL';
export const LOG_OUT = 'LOG_OUT';
export const CREATE_USER = 'CREATE_USER';

// import db from "../../db.hardcode.json";

export const googleLogin = (id) => {
	return async (dispatch) => {
		let response = await axios.get(
			`http://192.168.00.202:3000/userInfo?id=${id}`
		);
		return dispatch({
			type: GOOGLE_LOGIN,
			payload: response.data,
		});
	};
};

// export const getAllProfessionals = (profession) => {
// 	return async (dispatch) => {
// 		const info = await axios.get(
// 			`http://192.168.00.202:3000/professional?profession=${profession}`
// 		);
// 		return dispatch({
// 			type: GET_ALL,
// 			payload: info.data,
// 		});
// 	};
// };

export const logOut = () => {
	return { type: LOG_OUT, payload: {} };
};

export const createUser = (payload) => {
	return async (dispatch) => {
		try {
			let response = await axios.post(
				`http://192.168.00.202:3000/client/create`,
				payload
			);
			return dispatch({
				type: CREATE_USER,
				payload: response.data,
			});
		} catch (e) {
			console.log(e);
		}
	};
};

// export const getAllProfessionalsJson = () => {
// 	return {
// 		type: GET_ALL,
// 		payload: db.professional,
// 	};
// };

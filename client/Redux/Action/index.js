import axios from 'axios';
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const GET_ALL = 'GET_ALL';
export const LOG_OUT = 'LOG_OUT';
export const CREATE_USER = 'CREATE_USER';
export const SEARCH_NAME_PROFESSIONAL = 'SEARCH_NAME_PROFESSIONAL';
export const MERCADO_PAGO = 'MERCADO_PAGO';

// import db from "../../db.hardcode.json";
//https://backend-fixy.herokuapp.com/

export const googleLogin = (payload) => {
	// console.log("ESTOY EN LA ACTION", payload);
	return async (dispatch) => {
		let response = await axios.post(
			`https://backend-fixy.herokuapp.com/userInfo`,
			payload
		);
		return dispatch({
			type: GOOGLE_LOGIN,
			payload: response.data,
		});
	};
};

export const getAllProfessionals = (profession) => {
	return async (dispatch) => {
		const info = await axios.get(
			`https://backend-fixy.herokuapp.com/professional?profession=${profession}`
		);
		return dispatch({
			type: GET_ALL,
			payload: info.data,
		});
	};
};

export const logOut = () => {
	return { type: LOG_OUT, payload: {} };
};

export const createUser = (payload) => {
	return async (dispatch) => {
		try {
			let response = await axios.post(
				`https://backend-fixy.herokuapp.com/client/create`,
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

export const mercadoPago = () => {
	return async (dispatch) => {
		try {
			let response = await axios.post(
				'https://backend-fixy.herokuapp.com/mp/orden'
			);
			console.log(response.data);
			return dispatch({
				type: MERCADO_PAGO,
				payload: response.data,
			});
		} catch (e) {
			console.log(e);
		}
	};
};

export const searchProfessional = (name) => {
	return {
		type: SEARCH_NAME_PROFESSIONAL,
		payload: name,
	};
};

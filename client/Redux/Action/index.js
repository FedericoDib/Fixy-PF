import axios from 'axios';
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const GET_ALL_PROFESSIONALS = 'GET_ALL_PROFESSIONALS';
export const LOG_OUT = 'LOG_OUT';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const SEARCH_NAME_PROFESSIONAL = 'SEARCH_NAME_PROFESSIONAL';
export const MERCADO_PAGO = 'MERCADO_PAGO';
export const CREATE_PROFESSIONAL = 'CREATE_PROFESSIONAL';
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const REQUEST_TO_PROFESSIONAL = 'REQUEST_TO_PROFESSIONAL';

// import db from "../../db.hardcode.json";

export const googleLogin = (payload) => {
	// console.log("ESTOY EN LA ACTION", payload);
	return async (dispatch) => {
		let response = await axios.post(
			`http://192.168.0.11:3000/userInfo`,
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
			`http://192.168.0.11:3000/professional?profession=${profession}`
		);
		return dispatch({
			type: GET_ALL_PROFESSIONALS,
			payload: info.data,
		});
	};
};

export const logOut = () => {
	return { type: LOG_OUT, payload: {} };
};

export const createClient = (payload) => {
	return async (dispatch) => {
		try {
			let response = await axios.post(
				`http://192.168.0.11:3000/client/create`,
				payload
			);
			return dispatch({
				type: CREATE_CLIENT,
				payload: response.data,
			});
		} catch (e) {
			console.log(e);
		}
	};
};

export const createProfessional = (payload) => {
	return async (dispatch) => {
		try {
			let response = await axios.post(
				`http://192.168.0.11:3000/professional/create`,
				payload
			);
			return dispatch({
				type: CREATE_PROFESSIONAL,
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
			let response = await axios.post('http://192.168.0.11:3000/mp/orden');
			return dispatch({
				type: MERCADO_PAGO,
				payload: response.data.body.sandbox_init_point,
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

export const createRequest = (payload) => {
	return async (dispatch) => {
		try {
			let response = await axios.post(
				'http://192.168.0.11:3000/request',
				payload
			);
			return dispatch({
				type: CREATE_REQUEST,
				payload: response.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const requestToProfessional = (payload) => {
	return async (dispatch) => {
		try {
			let response = await axios.put(
				'http://192.168.0.11:3000/request',
				payload
			);
			return dispatch({
				type: REQUEST_TO_PROFESSIONAL,
				payload: response.data,
			});
		} catch (e) {
			console.log(e);
		}
	};
};

export const getAllRequest = () => {
	console.log('action');
	return async (dispatch) => {
		const info = await axios.get(`http://192.168.1.113:3000/request`);
		console.log(info.data);
		return dispatch({
			type: GET_ALL_REQUEST,
			payload: info.data,
		});
	};
};

import axios from 'axios';
import {
	CREATE_BUDGET,
	CREATE_PROFESSIONAL,
	CREATE_REVIEW_CLIENT,
	GET_ALL_BUDGETS,
	GET_ALL_BUDGETS_PROFESSIONAL,
	GET_ALL_CLIENTS,
	GET_BUDGET_DETAIL,
	GET_REQUEST_DETAIL,
	GET_DELETE_BUDGET,
} from './actionTypes';

//const URL = "https://fixy-backend.herokuapp.com";
const URL = 'http://192.168.0.202:3000';

/* -------------------------------------------------------------------------- */
/*                               GET CLIENT ID                             */
/* -------------------------------------------------------------------------- */
//**** ANTES GET ALL CLIENTS
// RECIBE:
// DEVUELVE:
export const getClientId = (id) => {
	return async (dispatch) => {
		try {
			let response = await axios.get(`${URL}/client?id=${id}`);

			return dispatch({
				type: GET_ALL_CLIENTS,
				payload: response.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

/* -------------------------------------------------------------------------- */
/*                             CREATE PROFESSIONAL                            */
/* -------------------------------------------------------------------------- */
//RECIBE: {
//   "address": "Mateo luque 123",
//   "availableTimes": Array [
//     6,
//     18,
//   ],
//   "city": "Cordoba",
//   "email": "fiorenza.seia@gmail.com",
//   "enrollment": "1234",
//   "expoToken": "ExponentPushToken[th8SPVFyPRJGrUCVk5CfCg]",
//   "googleId": "p116364624203518053381",
//   "isRegistered": true,
//   "name": "Fiorenza Seia",
//   "perfilPic": null,
//   "phoneNumber": "3513913647",
//   "profession": "electricista",
//   "province": "Cordoba",
//   "reviews": null,
// }
//DEVUELVE:
// {
//   "actualRequests": Array [
//     Object {},
//   ],
//   "address": "Mateo luque 123",
//   "availableTimes": Array [
//     "6",
//     "18",
//   ],
//   "city": "Cordoba",
//   "email": "fiorenza.seia@gmail.com",
//   "enrollment": "1234",
//   "expoToken": "ExponentPushToken[th8SPVFyPRJGrUCVk5CfCg]",
//   "firstLogin": true,
//   "googleId": "p116364624203518053381",
//   "isRegistered": true,
//   "name": "Fiorenza Seia",
//   "perfilPic": null,
//   "phoneNumber": "3513913647",
//   "profession": "electricista",
//   "province": "Cordoba",
//   "reviews": Array [
//     Object {},
//   ],
//   "status": false,
// }

export const createProfessional = (payload) => {
	return async (dispatch) => {
		try {
			let response = await axios.post(`${URL}/professional/create`, payload);
			return dispatch({
				type: CREATE_PROFESSIONAL,
				payload: response.data,
			});
		} catch (e) {
			console.log(e);
		}
	};
};

/* -------------------------------------------------------------------------- */
/*                            CREATE REVIEW CLIENT                            */
/* -------------------------------------------------------------------------- */
//RECIBE:
// DEVUELVE:
export const createReviewClient = (payload) => {
	return async (dispatch) => {
		try {
			const info = await axios.put(`${URL}/reviews/client`, payload);
			return dispatch({
				type: CREATE_REVIEW_CLIENT,
				payload: info.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

/* -------------------------------------------------------------------------- */
/*                                CREATE BUDGET                               */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:
export const createBudget = (payload) => {
	return async (dispatch) => {
		try {
			const info = await axios.post(`${URL}/budget`, payload);
			return dispatch({
				type: CREATE_BUDGET,
				payload: info.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

/* -------------------------------------------------------------------------- */
/*                               GET ALL BUDGETS FROM PROFESSIONAL                             */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:
export const getAllBudgetsFromProfessional = (id) => {
	return async (dispatch) => {
		try {
			let response = await axios.get(`${URL}/professional/budget?id=${id}`);
			return dispatch({
				type: GET_ALL_BUDGETS_PROFESSIONAL,
				payload: response.data,
			});
		} catch (e) {
			console.log(e);
		}
	};
};

//! REVISARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
/* -------------------------------------------------------------------------- */
/*                                DELETE BUDGET                               */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:
export const deleteBudget = (id) => {
	return async (dispatch) => {
		try {
			let response = await axios.delete(`${URL}/budget/${id}`);
			return dispatch({
				type: GET_DELETE_BUDGET,
				payload: response.data,
			});
		} catch (e) {
			console.log(e);
		}
	};
};

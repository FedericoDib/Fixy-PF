import axios from "axios";
import {
  EDIT_PROFILE,
  GET_ALL_REQUEST,
  GET_BUDGET_DETAIL,
  GOOGLE_LOGIN,
  LOG_OUT,
  SAVE_PERFILPIC,
  USER_DETAIL,
  GET_REQUEST_DETAIL,
  SET_BUDGET_REQUEST_COMPLETE,
  DELETE_REVIEW_PENDING,
  GET_USER_REVIEW,
} from "./actionTypes";
import storage from "../../Firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { async } from "@firebase/util";

const URL = "https://fixy-backend.herokuapp.com";
//const URL = "http://192.168.0.11:3000";

/* -------------------------------------------------------------------------- */
/*                                GOOGLE LOGIN                                */
/* -------------------------------------------------------------------------- */

//RECIBE: {
//   "email": "fiorenza.seia@gmail.com",
//   "family_name": "Seia",
//   "given_name": "Fiorenza",
//   "id": "116364624203518053381",
//   "locale": "es-419",
//   "name": "Fiorenza Seia",
//   "picture": "https://lh3.googleusercontent.com/a/AItbvmlRJyXLG7Xz-gfDs2u38vbDS85zRG9AczvHhJiR=s96-c",
//   "verified_email": true,
// }

//DEVUELVE: {
//   "address": null,
//   "city": null,
//   "email": "fiorenza.seia@gmail.com",
//   "expoToken": null,
//   "googleId": "116364624203518053381",
//   "isRegistered": false,
//   "name": "Fiorenza Seia",
//   "perfilPic": null,
//   "phoneNumber": null,
//   "province": null,
//   "reviews": null,
// }

export const googleLogin = (payload) => {
  return async (dispatch) => {
    let response = await axios.post(`${URL}/userInfo`, payload);
    return dispatch({
      type: GOOGLE_LOGIN,
      payload: response.data,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                                UPLOAD IMAGE                                */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:

export const uploadImage = (uri) => {
  return async (dispatch) => {
    const probando = ref(storage, `imageProfile/${Date.now().toString()}.jpg`);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const subir = await uploadBytes(probando, blob);
    const bajar = await getDownloadURL(subir.ref);
    return dispatch({
      type: SAVE_PERFILPIC,
      payload: bajar,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                                   LOG OUT                                  */
/* -------------------------------------------------------------------------- */
export const logOut = () => {
  return { type: LOG_OUT, payload: {} };
};

/* -------------------------------------------------------------------------- */
/*                               GET ALL REQUEST                              */
/* -------------------------------------------------------------------------- */
// Si recibe user = professional trae todas las request que se le hicieron al profesional. Si user = client devuelve todas las request que hizo + google.id
//RECIBE:
//DEVUELVE:

export const getAllRequest = (user, id) => {
  return async (dispatch) => {
    const info = await axios.get(`${URL}/request/${user}?id=${id}`);

    return dispatch({
      type: GET_ALL_REQUEST,
      payload: info.data,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                              GET BUDGET DETAIL                             */
/* -------------------------------------------------------------------------- */
export const getBudgetDetail = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${URL}/budget/${id}`);
      return dispatch({
        type: GET_BUDGET_DETAIL,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

/* -------------------------------------------------------------------------- */
/*                                EDIT PROFILE                                */
/* -------------------------------------------------------------------------- */
// MODIFICA CUALQUIERA DE LOS DOS PERFILES
//RECIBE:
//DEVUELVE:
export const editProfile = (payload) => {
  return async (dispatch) => {
    let response = await axios.put(`${URL}/client/profile`, payload);
    return dispatch({
      type: EDIT_PROFILE,
      payload: response.data,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                                 USER DETAIL                                */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:
export const userDetail = (id, user) => {
  return async (dispatch) => {
    let response = await axios.get(`${URL}/${user}/${id}`);
    return dispatch({
      type: USER_DETAIL,
      payload: response.data,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                             GET REQUEST DETAIL                             */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:
export const getRequestDetail = (id) => {
  return async (dispatch) => {
    const info = await axios.get(`${URL}/request?id=${id}`);
    return dispatch({
      type: GET_REQUEST_DETAIL,
      payload: info.data,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                             GET REQUEST DETAIL                             */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:

export const setBudgetAndRequestComplete = (id) => {
  return async (dispatch) => {
    const info = await axios.put(`${URL}/budget/complete/${id}`);
    return dispatch({
      type: SET_BUDGET_REQUEST_COMPLETE,
      payload: info.data,
    });
  };
};

export const deleteReviewPending = (id) => {
  console.log("action id", id);
  return async (dispatch) => {
    const info = await axios.put(`${URL}/budget/review/${id}`);
    return dispatch({
      type: DELETE_REVIEW_PENDING,
      payload: info.data,
    });
  };
};

export const getUserReview = ({ id, user }) => {
  return async (dispatch) => {
    const info = await axios.get(
      `${URL}/budget/complete/review?id=${id}&user=${user}`
    );
    return dispatch({
      type: GET_USER_REVIEW,
      payload: info.data,
    });
  };
};

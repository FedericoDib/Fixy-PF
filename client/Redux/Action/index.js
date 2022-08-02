import axios from "axios";
export const GOOGLE_LOGIN = "GOOGLE_LOGIN";
export const GET_ALL_PROFESSIONALS = "GET_ALL_PROFESSIONALS";
export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const LOG_OUT = "LOG_OUT";
export const CREATE_CLIENT = "CREATE_CLIENT";
export const SEARCH_NAME_PROFESSIONAL = "SEARCH_NAME_PROFESSIONAL";
export const MERCADO_PAGO = "MERCADO_PAGO";
export const CREATE_PROFESSIONAL = "CREATE_PROFESSIONAL";
export const CREATE_REQUEST = "CREATE_REQUEST";
export const REQUEST_TO_PROFESSIONAL = "REQUEST_TO_PROFESSIONAL";
export const GET_ALL_REQUEST = "GET_ALL_REQUEST";
export const CREATE_REVIEW_PROFESSIONAL = "CREATE_REVIEW_PROFESSIONAL";
export const CREATE_REVIEW_CLIENT = "CREATE_REVIEW_CLIENT";
export const SAVE_PERFILPIC = "SAVE_PERFILPIC";
export const GET_REQUEST_DETAIL = "GET_REQUEST_DETAIL";
export const CREATE_BUDGET = "CREATE_BUDGET";
export const ORDER_BY_CITY = "ORDER_BY_CITY";
export const ORDER_BY_REVIEW = "ORDER_BY_REVIEW";
export const AVERAGE_REVIEW = "AVERAGE_REVIEW";
export const COUNT_OFF = "COUNT_OFF";
export const COUNT_ADDITION = "COUNT_ADDITION";
export const AVERAGE_REVIEW_OFF = "AVERAGE_REVIEW_OFF";
export const GET_ALL_BUDGETS = "GET_ALL_BUDGETS";
export const GET_BUDGET_DETAIL = "GET_BUDGET_DETAIL";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const GET_ALL_BUDGETS_CLIENT = "GET_ALL_BUDGETS_CLIENT";
export const USER_DETAIL = "USER_DETAIL";
export const PAYPAL_PRICE = "PAYPAL_PRICE";

import storage from "../../Firebase/Firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { async } from "@firebase/util";

// import db from "../../db.hardcode.json";

const localhost = '192.168.0.27';

export const googleLogin = (payload) => {
  // console.log("ESTOY EN LA ACTION", payload);
  return async (dispatch) => {
    let response = await axios.post(
      `http://${localhost}:3000/userInfo`,
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
      `http://${localhost}:3000/professional?profession=${profession}`
    );
    return dispatch({
      type: GET_ALL_PROFESSIONALS,
      payload: info.data,
    });
  };
};

export const getAllClients = (id) => {
  return async (dispatch) => {
    let response = await axios.get(`http://${localhost}:3000/client?id=${id}`);
    return dispatch({
      type: GET_ALL_CLIENTS,
      payload: response.data,
    });
  };
};

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
    console.log(bajar);
    return dispatch({
      type: SAVE_PERFILPIC,
      payload: bajar,
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
        `http://${localhost}:3000/client/create`,
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
        `http://${localhost}:3000/professional/create`,
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
        `http://${localhost}:3000/request`,
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
        `http://${localhost}:3000/request`,
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

export const getRequestDetail = (id) => {
  return async (dispatch) => {
    const info = await axios.get(`http://${localhost}:3000/request?id=${id}`);
    return dispatch({
      type: GET_REQUEST_DETAIL,
      payload: info.data,
    });
  };
};

export const getAllRequest = (user, id) => {
  return async (dispatch) => {
    const info = await axios.get(
      `http://${localhost}:3000/request/${user}?id=${id}`
    );
    console.log(info.data);
    return dispatch({
      type: GET_ALL_REQUEST,
      payload: info.data,
    });
  };
};

export const createReviewProfessional = (payload) => {
  return async (dispatch) => {
    const info = await axios.put(
      `http://${localhost}:3000/reviews/professional`,
      payload
    );
    return dispatch({
      type: CREATE_REVIEW_PROFESSIONAL,
      payload: info.data,
    });
  };
};

export const createReviewClient = (payload) => {
  return async (dispatch) => {
    const info = await axios.put(
      `http://${localhost}:3000/reviews/client`,
      payload
    );
    return dispatch({
      type: CREATE_REVIEW_CLIENT,
      payload: info.data,
    });
  };
};

export const createBudget = (payload) => {
  return async (dispatch) => {
    const info = await axios.post(`http://${localhost}:3000/budget`, payload);
    return dispatch({
      type: CREATE_BUDGET,
      payload: info.data,
    });
  };
};

export const mercadoPago = () => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`http://${localhost}:3000/mp/orden`);
      return dispatch({
        type: MERCADO_PAGO,
        payload: response.data.body.sandbox_init_point,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllBudgets = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `http://${localhost}:3000/professional/budget?id=${id}`
      );
      return dispatch({
        type: GET_ALL_BUDGETS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getBudgetDetail = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`http://${localhost}:3000/budget/${id}`);
      return dispatch({
        type: GET_BUDGET_DETAIL,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteBudget = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`http://${localhost}:3000/budget/${id}`);
      return dispatch({
        type: GET_BUDGET_DETAIL,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteRequest = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`http://${localhost}:3000/budget/${id}`);
      return dispatch({
        type: GET_BUDGET_DETAIL,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const editProfile = (payload) => {
  console.log("PAYLOAD ACTION", payload);
  return async (dispatch) => {
    let response = await axios.put(
      `http://${localhost}:3000/client/profile`,
      payload
    );
    return dispatch({
      type: EDIT_PROFILE,
      payload: response.data,
    });
  };
};

export const getAllBudgetsClient = (id) => {
  return async (dispatch) => {
    let response = await axios.get(
      `http://${localhost}:3000/client/budget?id=${id}`
    );
    return dispatch({
      type: GET_ALL_BUDGETS_CLIENT,
      payload: response.data,
    });
  };
};

export const orderByCity = (payload) => {
  return {
    type: ORDER_BY_CITY,
    payload,
  };
};

export const orderByReview = (payload) => {
  return {
    type: ORDER_BY_REVIEW,
    payload,
  };
};

export const averageReview = (payload) => {
  return {
    type: AVERAGE_REVIEW,
    payload,
  };
};

export const averageReviewOff = (payload) => {
  return {
    type: AVERAGE_REVIEW_OFF,
    payload,
  };
};

export const countOff = (payload) => {
  return {
    type: COUNT_OFF,
    payload,
  };
};
export const countAddition = (payload) => {
  return {
    type: COUNT_ADDITION,
    payload,
  };
};

export const userDetail = (id, user) => {
  return async (dispatch) => {
    let response = await axios.get(`http://${localhost}:3000/${user}/${id}`);
    return dispatch({
      type: USER_DETAIL,
      payload: response.data,
    });
  };
};

export const paypalPrice = (price) => {
  console.log("ACTION PRICE", price);
  return async (dispatch) => {
    let response = await axios.get(
      `http://${localhost}:3000/paypal/paypal?price=${price}`
    );
    return dispatch({
      type: PAYPAL_PRICE,
      payload: response.data,
    });
  };
};

export const rejectBudgetClient = (payload) => {
  return async (dispatch) => {
    let response = await axios.put(
      `http://${localhost}:3000/client/budget`,
      payload
    );
  };
};

export const setStatusRequestToActive = (id) => {
  return async (dispatch) => {
    let response = await axios.put(`http://${localhost}:3000/request/${id}`);
  };
};

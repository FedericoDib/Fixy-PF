import axios from "axios";
import {
  AVERAGE_REVIEW,
  AVERAGE_REVIEW_OFF,
  COUNT_ADDITION,
  COUNT_OFF,
  CREATE_CLIENT,
  CREATE_REQUEST,
  CREATE_REVIEW_PROFESSIONAL,
  GET_ALL_BUDGETS_CLIENT,
  GET_ALL_PROFESSIONALS,
  GET_ALL_REQUEST,
  GET_BUDGET_DETAIL,
  MERCADO_PAGO,
  ORDER_BY_CITY,
  ORDER_BY_REVIEW,
  PAYPAL_PRICE,
  REQUEST_TO_PROFESSIONAL,
  SEARCH_NAME_PROFESSIONAL,
  GET_DELETE_REQUEST,
} from "./actionTypes";

const URL = 'https://fixy-backend.herokuapp.com'
// const URL = "http://192.168.0.11:3000";

/* -------------------------------------------------------------------------- */
/*                            GET ALL PROFESSIONALS                           */
/* -------------------------------------------------------------------------- */
//RECIBE: Unknow, electricista, plomero, gasista
//DEVUELVE: [profesionales completo o filtrado por profesion]
export const getAllProfessionals = (profession) => {
  return async (dispatch) => {
    const info = await axios.get(
      `${URL}/professional?profession=${profession}`
    );
    return dispatch({
      type: GET_ALL_PROFESSIONALS,
      payload: info.data,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                                CREATE CLIENT                               */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:

export const createClient = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${URL}/client/create`, payload);
      return dispatch({
        type: CREATE_CLIENT,
        payload: response.data,
      });
      
    } catch (e) {
      console.log(e);
    }
  };
};

/* -------------------------------------------------------------------------- */
/*                                SEARCH PROFES                               */
/* -------------------------------------------------------------------------- */
// RECIBE:
// DEVUELVE:

export const searchProfessional = (name) => {
  return {
    type: SEARCH_NAME_PROFESSIONAL,
    payload: name,
  };
};

/* -------------------------------------------------------------------------- */
/*                               CLIENT REQUEST                               */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:

export const createRequest = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${URL}/request`, payload);
      return dispatch({
        type: CREATE_REQUEST,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

/* -------------------------------------------------------------------------- */
/*                           REQUEST TO PROFESSIONAL                          */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:

export const requestToProfessional = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(`${URL}/request`, payload);
      return dispatch({
        type: REQUEST_TO_PROFESSIONAL,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

/* -------------------------------------------------------------------------- */
/*                         CREATE REVIEW PROFESSIONAL                         */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:

export const createReviewProfessional = (payload) => {
  return async (dispatch) => {
    const info = await axios.put(`${URL}/reviews/professional`, payload);
    return dispatch({
      type: CREATE_REVIEW_PROFESSIONAL,
      payload: info.data,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                                 MERCADOPAGO                                */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:
export const mercadoPago = () => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${URL}/mp/orden`);
      return dispatch({
        type: MERCADO_PAGO,
        payload: response.data.body.sandbox_init_point,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

//!REVISARRRRRRRRRRR
/* -------------------------------------------------------------------------- */
/*                               DELET REQUEST                               */
/* -------------------------------------------------------------------------- */
export const deleteRequest = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(`${URL}/request/${id}`);
      return dispatch({
        type: GET_DELETE_REQUEST,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

/* -------------------------------------------------------------------------- */
/*                         GET ALL BUDGET FROM CLIENT                         */
/* -------------------------------------------------------------------------- */
export const getAllBudgetsFromClient = (id) => {
  return async (dispatch) => {
    let response = await axios.get(`${URL}/client/budget?id=${id}`);
    return dispatch({
      type: GET_ALL_BUDGETS_CLIENT,
      payload: response.data,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                            SORTING AND FILTERIN                            */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:
export const orderByCity = (payload) => {
  return {
    type: ORDER_BY_CITY,
    payload,
  };
};

//RECIBE:
//DEVUELVE:
export const orderByReview = (payload) => {
  return {
    type: ORDER_BY_REVIEW,
    payload,
  };
};

//RECIBE:
//DEVUELVE:
export const averageReview = (payload) => {
  return {
    type: AVERAGE_REVIEW,
    payload,
  };
};

//RECIBE:
//DEVUELVE:
export const averageReviewOff = (payload) => {
  return {
    type: AVERAGE_REVIEW_OFF,
    payload,
  };
};

//RECIBE:
//DEVUELVE:
export const countOff = (payload) => {
  return {
    type: COUNT_OFF,
    payload,
  };
};

//RECIBE:
//DEVUELVE:
export const countAddition = (payload) => {
  return {
    type: COUNT_ADDITION,
    payload,
  };
};

/* -------------------------------------------------------------------------- */
/*                                PAYPAL PRICE                                */
/* -------------------------------------------------------------------------- */
//RECIBE:
//DEVUELVE:
export const paypalPrice = (price) => {
  return async (dispatch) => {
    let response = await axios.get(`${URL}/paypal/paypal?price=${price}`);
    return dispatch({
      type: PAYPAL_PRICE,
      payload: response.data,
    });
  };
};

/* -------------------------------------------------------------------------- */
/*                            REJECT BUDGET CLIENT                            */
/* -------------------------------------------------------------------------- */
//CUANDO EL CLIENTE PRESIONA RECHAZAR PRESUPUESTO ROMPE LA RELACION DEL BUDGET CON ESA REQUEST
//RECIBE:
//DEVUELVE:
export const rejectBudgetClient = (payload) => {
  return async (dispatch) => {
    let response = await axios.put(`${URL}/client/budget`, payload);
  };
};

/* -------------------------------------------------------------------------- */
/*                        SET STATUS REQUEST TO ACTIVE                        */
/* -------------------------------------------------------------------------- */
//RECIBE:
//RECHAZA:
export const setStatusRequestToActive = (id) => {
  return async (dispatch) => {
    let response = await axios.put(`${URL}/request/${id}`);
  };
};

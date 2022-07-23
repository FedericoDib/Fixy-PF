import axios from "axios";
export const GOOGLE_LOGIN = "GOOGLE_LOGIN";
export const GET_ALL = "GET_ALL";

// import db from "../../db.hardcode.json";

export const googleLogin = (id) => {
  return async (dispatch) => {
    let response = await axios.get(
      `http://192.68.40.173:3000/userInfo?id=${id}`
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
      type: GET_ALL,
      payload: info.data,
    });
  };
};

// export const getAllProfessionalsJson = () => {
// 	return {
// 		type: GET_ALL,
// 		payload: db.professional,
// 	};
// };

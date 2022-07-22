import axios from "axios";
const GOOGLE_SIGN_UP = "GOOGLE_SIGN_UP";
export const GET_ALL = "GET_ALL";

import db from "../../db.hardcode.json";

export const googleSignUp = () => {};

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

import axios from "axios";
export const GET_ALL_CHARACTERS = "GET_ALLCHARACTERS";
export const DELETE_ALL_CHARACTERS = "DELTE_ALL_CHARACTERS";
export const GET_DETAIL = "GET_DETAIL";
export const DELETE_DETAIL = "DELETE_DETAIL";

export function getAllCharacters() {
  return async (dispatch) => {
    try {
      const allChar = await axios(
        "https://pi-countries-fs.herokuapp.com/countries"
      );
      console.log(allChar.data);
      return dispatch({
        type: GET_ALL_CHARACTERS,
        payload: allChar.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteAllCharacters() {
  return {
    type: DELETE_ALL_CHARACTERS,
    payload: [],
  };
}

export function getDetail(id) {
  return async (dispatch) => {
    try {
      const detailChar = await axios(
        `https://pi-countries-fs.herokuapp.com/countries/${id}`
      );

      return dispatch({
        type: GET_DETAIL,
        payload: detailChar.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteDetail() {
  return {
    type: DELETE_DETAIL,
    payload: [],
  };
}

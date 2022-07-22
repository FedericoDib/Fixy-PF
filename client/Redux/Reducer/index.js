import { GET_ALL } from "../Action/index";
const initialState = {
  professionals: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        professionals: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

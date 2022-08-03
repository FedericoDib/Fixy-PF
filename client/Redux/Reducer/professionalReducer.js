import { CREATE_BUDGET, CREATE_REVIEW_CLIENT } from "../Action/actionTypes";

const initialState = {};

const professionalReducer = (state = initialState, action) => {
	switch (action.type) {
    case CREATE_REVIEW_CLIENT:
      return {
        ...state,
      };
    case CREATE_BUDGET:
      return {
        ...state,
      };
		default:
			return { ...state };
	}
};

export default professionalReducer
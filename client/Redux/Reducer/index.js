import { GET_ALL, GOOGLE_LOGIN, LOG_OUT, CREATE_USER } from '../Action/index';
const initialState = {
	professionals: [],
	user: {},
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL:
			return {
				...state,
				professionals: action.payload,
			};
		case GOOGLE_LOGIN:
			return {
				...state,
				user: action.payload,
			};
		case LOG_OUT:
			return {
				...state,
				user: action.payload,
			};
		case CREATE_USER:
			console.log(action.payload);

		default:
			return state;
	}
};

export default rootReducer;

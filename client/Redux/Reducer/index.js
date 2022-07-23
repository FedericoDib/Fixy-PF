import { GET_ALL, GOOGLE_LOGIN } from '../Action/index';
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
			console.log(action.payload);
		default:
			return state;
	}
};

export default rootReducer;

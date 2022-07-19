import {
	GET_ALL_CHARACTERS,
	DELETE_ALL_CHARACTERS,
	GET_DETAIL,
	DELETE_DETAIL,
} from '../action';

const initialState = {
	characters: [],
	detail: [],
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_CHARACTERS:
			return {
				...state,
				characters: action.payload,
			};
		case DELETE_ALL_CHARACTERS:
			return {
				...state,
				characters: [],
			};
		case GET_DETAIL:
			return {
				...state,
				detail: action.payload,
			};
		case DELETE_DETAIL:
			return {
				...state,
				detail: action.payload,
			};
		default:
			return state;
	}
}

export default reducer;

import {
	GET_ALL,
	GOOGLE_LOGIN,
	LOG_OUT,
	CREATE_USER,
	SEARCH_NAME_PROFESSIONAL,
	MERCADO_PAGO,
	GET_ALL_REQUEST,
} from '../Action/index';
const initialState = {
	professionals: [],
	copyProfessionals: [],
	user: {},
	ordenMp: '',
	requests: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL:
			return {
				...state,
				professionals: action.payload,
				copyProfessionals: action.payload,
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
			console.log('ESTOY EN EL REDUCER', action.payload);
			return {
				...state,
				user: { ...state.user, ...action.payload },
			};
		case SEARCH_NAME_PROFESSIONAL:
			return {
				...state,
				professionals: state.copyProfessionals.filter((p) =>
					p.name.toLowerCase().includes(action.payload.toLowerCase())
				),
			};
		case MERCADO_PAGO:
			return {
				...state,
				ordenMp: action.payload,
			};
		case GET_ALL_REQUEST:
			return {
				...state,
				requests: action.payload,
			};
		default:
			return state;
	}
};

export default rootReducer;

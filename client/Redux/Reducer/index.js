import {
	GET_ALL_PROFESSIONALS,
	GOOGLE_LOGIN,
	LOG_OUT,
	CREATE_CLIENT,
	SEARCH_NAME_PROFESSIONAL,
	MERCADO_PAGO,
	CREATE_PROFESSIONAL,
	CREATE_REQUEST,
	REQUEST_TO_PROFESSIONAL,
	GET_ALL_REQUEST,
	CREATE_REVIEW_PROFESSIONAL,
	CREATE_REVIEW_CLIENT,
	SAVE_PERFILPIC,
	GET_REQUEST_DETAIL,
	CREATE_BUDGET,
	GET_ALL_CLIENTS,
	GET_ALL_BUDGETS,
  GET_BUDGET_DETAIL
} from '../Action/index';
const initialState = {
	user: {},
	professionals: [],
	clients: [],
	copyProfessionals: [],
	request: {},
	ordenMp: '',
	allRequests: {},
	perfilPic: '',
	requesDetail: {},
	budgets: [],
  budgetDetail:{}
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GOOGLE_LOGIN:
			return {
				...state,
				user: action.payload,
			};
		case GET_ALL_PROFESSIONALS:
			return {
				...state,
				professionals: action.payload,
				copyProfessionals: action.payload,
			};
		case GET_ALL_CLIENTS:
			return {
				...state,
				clients: action.payload,
			};
		case LOG_OUT:
			return {
				...state,
				user: action.payload,
			};
		case CREATE_CLIENT:
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

		case SAVE_PERFILPIC:
			return {
				...state,
				perfilPic: action.payload,
			};

		case CREATE_PROFESSIONAL:
			return {
				...state,
				user: { ...state.user, ...action.payload },
			};
		case CREATE_REQUEST:
			return {
				...state,
				request: action.payload,
			};
		case REQUEST_TO_PROFESSIONAL:
			return {
				...state,
			};
		case GET_ALL_REQUEST:
			return {
				...state,
				allRequests: action.payload,
			};
		case CREATE_REVIEW_PROFESSIONAL:
			return {
				...state,
			};
		case CREATE_REVIEW_CLIENT:
			return {
				...state,
			};
		case GET_REQUEST_DETAIL:
			return {
				...state,
				requestDetail: action.payload,
			};
		case CREATE_BUDGET:
			return {
				...state,
			};
		case GET_ALL_BUDGETS:
			return {
				...state,
				budgets: action.payload.budgets,
			};
    
    case GET_BUDGET_DETAIL:
      //console.log('------------------', action.payload)
      return {
        ...state,
        budgetDetail: action.payload
      }

		default:
			return state;
	}
};

export default rootReducer;

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
} from "../Action/index";
const initialState = {
  professionals: [],
  copyProfessionals: [],
  user: {},
  request: {},
  ordenMp: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROFESSIONALS:
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

    default:
      return state;
  }
};

export default rootReducer;

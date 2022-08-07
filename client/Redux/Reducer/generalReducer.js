import {
  CREATE_CLIENT,
  CREATE_PROFESSIONAL,
  CREATE_REVIEW_CLIENT,
  EDIT_PROFILE,
  GET_ALL_BUDGETS,
  GET_ALL_BUDGETS_CLIENT,
  GET_ALL_BUDGETS_PROFESSIONAL,
  GET_ALL_REQUEST,
  GET_BUDGET_DETAIL,
  GET_REQUEST_DETAIL,
  GOOGLE_LOGIN,
  LOG_OUT,
  SAVE_PERFILPIC,
  USER_DETAIL,
  GET_DELETE_REQUEST,
  GET_DELETE_BUDGET,
  DELETE_REVIEW_PENDING,
  GET_USER_REVIEW,
  GET_NOT_SEEN_NOTIF,
  GET_ALL_NOTIF,
  SET_SEEN_NOTIF
} from "../Action/actionTypes";

const initialState = {
  user: {}, //*Trae datos propios
  perfilPic: "",
  userDetail: {}, //*Se usa para traer los datos del otro
  allRequests: [],
  requestDetail: {},
  budgets: [],
  budgetDetail: {},
  notifications: []
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case GET_ALL_REQUEST:
      return {
        ...state,
        allRequests: action.payload,
      };

    case GET_REQUEST_DETAIL:
      return {
        ...state,
        requestDetail: action.payload,
      };
    case GET_ALL_BUDGETS_PROFESSIONAL:
      return {
        ...state,
        budgets: action.payload.budgets,
      };

    case GET_ALL_BUDGETS_CLIENT:
      return {
        ...state,
        budgets: action.payload.budgets,
      };

    case GET_BUDGET_DETAIL:
      return {
        ...state,
        budgetDetail: action.payload,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        user: action.payload,
      };

    case USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case GET_DELETE_REQUEST:
      return {
        ...state,
        allRequests: action.payload,
      };
    case GET_DELETE_BUDGET:
      return {
        ...state,
        budgets: action.payload,
      };
    case DELETE_REVIEW_PENDING:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_REVIEW:
      return {
        ...state,
        userDetail: action.payload,
      };

    case GET_NOT_SEEN_NOTIF:
      return {
        ...state,
        notifications: action.payload
      }
      case GET_ALL_NOTIF:
        return {
          ...state,
          notifications: action.payload
        }
      case SET_SEEN_NOTIF:
        return{
          ...state,
          notifications:action.payload
        } 
    default:
      return {
        ...state,
      };
  }
};

export default generalReducer;

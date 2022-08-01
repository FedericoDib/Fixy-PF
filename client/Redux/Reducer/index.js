// import { professionals } from "../../Components/List/Hardcode";
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
  ORDER_BY_CITY,
  ORDER_BY_REVIEW,
  AVERAGE_REVIEW,
  AVERAGE_REVIEW_OFF,
  COUNT_OFF,
  COUNT_ADDITION,
  GET_ALL_BUDGETS,
  GET_BUDGET_DETAIL,
  EDIT_PROFILE,
  GET_ALL_BUDGETS_CLIENT,
  USER_DETAIL,
  PAYPAL_PRICE,
} from "../Action/index";
const initialState = {
  user: {},
  professionals: [],
  clients: [],
  copyProfessionals: [],
  request: {},
  ordenMp: "",
  allRequests: {},
  perfilPic: "",
  requestDetail: {},
  order: [],
  notOrder: [],
  count: 0,
  averageReviews: [],
  budgets: [],
  budgetDetail: {},
  userDetail: {},
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
    case ORDER_BY_CITY:
      // console.log("professionals", state.professionals);
      return {
        ...state,
        order: state.professionals.filter(
          (professional) => professional.city === action.payload
        ),
        notOrder: state.professionals.filter(
          (professional) => professional.city !== action.payload
        ),
        professionals: [...state.order, ...state.notOrder],
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
        budgetDetail: action.payload,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ALL_BUDGETS_CLIENT:
      return {
        ...state,
        budgets: action.payload.budgets,
      };
    case AVERAGE_REVIEW:
      // console.log("count", state.count);
      // console.log("rating", action.payload.rating);

      return {
        ...state,
        averageReviews: [...state.averageReviews, action.payload.rating],
      };
    case AVERAGE_REVIEW_OFF:
      // console.log("count", state.count);
      // console.log("rating", action.payload.rating);
      return {
        ...state,
        averageReviews: [],
      };
    case COUNT_OFF:
      console.log("countoff reducer");
      return {
        ...state,
        count: 0,
      };
    case COUNT_ADDITION:
      return {
        ...state,
        count: state.count + 1,
      };
    case ORDER_BY_REVIEW:
      console.log("professionals en el reducer ", state.professionals);
      return {
        ...state,
        professionals: state.professionals.sort((a, b) => {
          // console.log("sortttttttttttttttttt", a.averageReview);
          if (a.averageReview > b.averageReview) {
            return -1;
          }
          if (a.averageReview < b.averageReview) {
            return 1;
          }
          return 0;
        }),
      };
    case USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case PAYPAL_PRICE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;

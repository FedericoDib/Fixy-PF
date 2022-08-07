import {
  AVERAGE_REVIEW,
  AVERAGE_REVIEW_OFF,
  COUNT_ADDITION,
  COUNT_OFF,
  CREATE_REQUEST,
  CREATE_REVIEW_PROFESSIONAL,
  GET_ALL_PROFESSIONALS,
  MERCADO_PAGO,
  ORDER_BY_CITY,
  ORDER_BY_REVIEW,
  PAYPAL_PRICE,
  REQUEST_TO_PROFESSIONAL,
  SEARCH_NAME_PROFESSIONAL,
  SET_REQUEST,
} from "../Action/actionTypes";

const initialState = {
  professionals: [],
  copyProfessionals: [],
  request: {}, //* Para crear la request
  ordenMp: "",
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROFESSIONALS:
      return {
        ...state,
        professionals: action.payload,
        copyProfessionals: action.payload,
      };
    case MERCADO_PAGO:
      return {
        ...state,
        ordenMp: action.payload,
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
    case CREATE_REVIEW_PROFESSIONAL:
      return {
        ...state,
      };
    case PAYPAL_PRICE:
      return {
        ...state,
      };

    /* -------------------------- SORTING AND FILTERING ------------------------- */
    case ORDER_BY_CITY:
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
    case AVERAGE_REVIEW:
      return {
        ...state,
        averageReviews: [...state.averageReviews, action.payload.rating],
      };
    case AVERAGE_REVIEW_OFF:
      return {
        ...state,
        averageReviews: [],
      };
    case COUNT_OFF:
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
      return {
        ...state,
        professionals: state.professionals.sort((a, b) => {
          if (a.averageReview > b.averageReview) {
            return -1;
          }
          if (a.averageReview < b.averageReview) {
            return 1;
          }
          return 0;
        }),
      };
    case SEARCH_NAME_PROFESSIONAL:
      return {
        ...state,
        professionals: state.copyProfessionals.filter((p) =>
          p.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case SET_REQUEST:
      return {
        ...state,
        request: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default clientReducer;

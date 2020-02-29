import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
} from './actionTypes';

export const INITIAL_STATE = {
  signed: false,
  token: null,
  loading: false,
};

export default function authReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        signed: true,
        token: payload.token,
      };

    case SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
      };

    case SIGN_OUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
}

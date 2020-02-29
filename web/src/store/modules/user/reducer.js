import { SIGN_IN_SUCCESS } from '../auth/actionTypes';

export const INITIAL_STATE = {
  loading: false,
  profile: null,
};

export default function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        profile: payload.user,
      };

    default:
      return state;
  }
}

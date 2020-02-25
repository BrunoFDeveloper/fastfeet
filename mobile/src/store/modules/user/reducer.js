import { SIGN_IN_SUCCESS } from '../auth/actionTypes';

const INITIAL_STATE = {
  profile: null,
};

export default function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        profile: payload.profile,
      };
    default:
      return state;
  }
}

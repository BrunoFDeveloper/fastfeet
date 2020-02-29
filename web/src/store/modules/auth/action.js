import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
} from './actionTypes';

export function signInRequest(email, password) {
  return { type: SIGN_IN_REQUEST, payload: { email, password } };
}

export function signInSuccess(token, user) {
  return { type: SIGN_IN_SUCCESS, payload: { token, user } };
}

export function signFailure() {
  return { type: SIGN_IN_FAIL };
}

export function signOut() {
  return { type: SIGN_OUT };
}

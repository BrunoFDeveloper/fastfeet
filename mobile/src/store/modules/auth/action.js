import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
} from './actionTypes';

export function signInRequest(userId) {
  return { type: SIGN_IN_REQUEST, payload: { userId } };
}

export function signInSuccess(userId, profile) {
  return { type: SIGN_IN_SUCCESS, payload: { userId, profile } };
}

export function signFailure() {
  return { type: SIGN_IN_FAIL };
}
export function signOut() {
  return { type: SIGN_OUT };
}

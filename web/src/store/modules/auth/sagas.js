import { all, put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { SIGN_IN_REQUEST } from './actionTypes';
import { signInSuccess, signFailure } from './action';

import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const response = yield call(api.post, 'session', payload);
    const { token, user } = response.data;
    yield put(signInSuccess(token, user));
    toast.success('Logado com sucesso!');
    history.push('/dashboard');
  } catch (error) {
    yield put(signFailure());
    toast.error('Erro ao logar, verifique suas informações!');
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(SIGN_IN_REQUEST, signIn),
  // takeLatest(SIGN_OUT, signOut),
]);

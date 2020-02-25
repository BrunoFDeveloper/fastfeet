import { all, put, takeLatest, call } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { SIGN_IN_REQUEST } from './actionTypes';
import { signInSuccess } from './action';

export function* signIn({ payload: { userId } }) {
  if (!userId) {
    Alert.alert('Informe um ID de cadastro!');
    return;
  }
  try {
    const response = yield call(api.get, 'couriers', {
      params: { id: userId },
    });

    yield put(signInSuccess(userId, response.data[0]));
    Alert.alert('Logado com sucesso!');
  } catch (error) {
    Alert.alert('Ocorreu algum erro!');
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest(SIGN_IN_REQUEST, signIn),
  // takeLatest(SIGN_OUT, signOut),
]);

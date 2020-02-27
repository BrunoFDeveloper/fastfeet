import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';
import { signIn } from '~/store/modules/auth/sagas';
import * as actions from '~/store/modules/auth/action';
import * as actionTypes from '~/store/modules/auth/actionTypes';
import api from '~/services/api';

const apiMock = new MockAdapter(api);

describe('Auth saga', () => {
  test(`Check user request login ${actionTypes.SIGN_IN_REQUEST}`, async () => {
    const dispatch = jest.fn();

    apiMock.onPost('session').reply(200, { token: 'token', user: {} });

    await runSaga({ dispatch }, signIn, { payload: {} }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(actions.signInSuccess('token', {}));
  });
});

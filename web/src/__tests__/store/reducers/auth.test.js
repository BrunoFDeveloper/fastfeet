import reducer, { INITIAL_STATE } from '~/store/modules/auth/reducer';
import * as actions from '~/store/modules/auth/action';
import * as actionTypes from '~/store/modules/auth/actionTypes';

describe('Auth reducer', () => {
  test(`Check user request login ${actionTypes.SIGN_IN_REQUEST}`, () => {
    const state = reducer(
      INITIAL_STATE,
      actions.signInRequest('test@gmail.com', '12345')
    );

    expect(state).toStrictEqual({ signed: false, token: null, loading: true });
  });

  test(`Check user success login ${actionTypes.SIGN_IN_SUCCESS}`, () => {
    const state = reducer(INITIAL_STATE, actions.signInSuccess('token', {}));

    expect(state).toStrictEqual({
      signed: true,
      token: 'token',
      loading: false,
    });
  });
});

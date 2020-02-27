import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/action';
import Login from '~/screens/Auth/Login';

afterEach(cleanup);

jest.mock('react-redux');

describe('Test <Login /> Page', () => {
  test('Test email form validation', async () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Login />);
    const emailLabel = 'exemplo@gmail.com';

    fireEvent.change(getByPlaceholderText(emailLabel), {
      target: { value: '12123s1@' },
    });

    fireEvent.submit(getByTestId('login-form'));

    await wait(() => {
      expect(getByText('Email inválido')).toBeTruthy();
    });
  });

  test('Test password form validation', async () => {
    const { getByTestId, getByText } = render(<Login />);

    fireEvent.submit(getByTestId('login-form'));
    await wait(() => expect(getByText('A senha é obrigatória!')).toBeTruthy());
  });

  test('Should SignIn when fill all fields and submit form', async () => {
    const { getByTestId, getByPlaceholderText } = render(<Login />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const emailLabel = 'exemplo@gmail.com';
    const passwordLabel = 'sua senha';
    const email = 'bruno7@gmail.com';
    const password = '12345';

    fireEvent.change(getByPlaceholderText(emailLabel), {
      target: { value: email },
    });

    fireEvent.change(getByPlaceholderText(passwordLabel), {
      target: { value: password },
    });

    fireEvent.submit(getByTestId('login-form'));
    await wait(() =>
      expect(dispatch).toHaveBeenCalledWith(signInRequest(email, password))
    );
  });
});

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, wait, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/action';

import Header from '~/components/Header/Header';

jest.mock('react-redux');

describe('Test <Header /> Component', () => {
  test('Should have user name in header', () => {
    useSelector.mockImplementation(cb =>
      cb({ user: { profile: { name: 'Admin' } } })
    );

    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(getByText('Admin')).toBeTruthy();
  });

  test('Should logout user', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    fireEvent.click(getByText('sair do sistema'));

    expect(dispatch).toBeCalledWith(signOut());
  });
});

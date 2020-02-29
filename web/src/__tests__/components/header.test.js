import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, wait } from '@testing-library/react';
import { useSelector } from 'react-redux';

import Header from '~/components/Header/Header';

// jest.mock('react-redux');

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: () => ({
    name: 'Admin',
  }),
}));

describe('Test <Header /> Component', () => {
  test('Should have user name in header', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    await wait(() => {
      expect(getByText('Admin')).toBeTruthy();
    });
  });
});

import React from 'react';
import { useSelector } from 'react-redux';
import { render, cleanup, wait } from '@testing-library/react-native';

import Profile from '~/pages/Profile/Profile';

afterEach(cleanup);

jest.mock('react-redux');

describe('<Profile />', () => {
  test('Should have user informations', async () => {
    const { getByText } = render(<Profile />);
    useSelector.mockImplementation(cb =>
      cb({
        profile: {
          name: 'Bruno',
          email: 'bruno@gmail.com',
          created_at: '2020-02-02T03:07:05.417Z',
        },
      })
    );

    expect(getByText('Bruno')).toBeTruthy();
    expect(getByText('bruno@gmail.com')).toBeTruthy();
    expect(getByText('02/02/2020')).toBeTruthy();
  });
});

import React from 'react';
import { useSelector } from 'react-redux';
import { render, cleanup, wait } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

import Dashboard from '~/pages/Dashboard/Dashboard';

const apiMock = new MockAdapter(api);

jest.mock('react-redux');

afterEach(cleanup);

const userMock = {
  name: 'Bruno',
  email: 'bruno@gmail.com',
  created_at: '2020-02-02T03:07:05.417Z',
  avatar: { url: '' },
};

describe('Testing <Dashboard /> page', () => {
  test('Check if is calling api', async () => {
    useSelector.mockImplementation(cb =>
      cb({
        user: {
          profile: {
            ...userMock,
          },
        },
      })
    );

    const { getByText, debug } = render(<Dashboard />);

    apiMock.onGet(`/deliveryman/${userMock.id}`).reply(200, [
      {
        id: 12,
        product: 'Cadeira gamer bruno',
        created_at: '2020-02-21T00:59:29.954Z',
        start_date: null,
        end_date: null,
        recipient: {
          name: 'Bruno',
          street: 'Jorge',
          number: 120,
          complement: 'ap 33',
          state: 'SP',
          city: 'itu',
          cep: '1331232',
        },
      },
    ]);

    await wait(() => {
      // debug();
      expect(getByText('20/02/2020')).toBeTruthy();
    });
  });
});

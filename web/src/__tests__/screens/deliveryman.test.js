import React from 'react';
import { render, cleanup, wait, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Deliveryman from '~/screens/Deliveryman/Deliveryman';
import api from '~/services/api';

afterEach(cleanup);

const apiMock = new MockAdapter(api);

const dataMock = [
  {
    id: 2,
    name: 'Bruno',
    email: 'bruno.entregador@gmail.com',
    avatar: {
      url: 'http://localhost:3340/files/20011c52262680eb401f870a41add1.png',
      id: 1,
      path: '20011c52262680eb401f870a41add1.png',
    },
  },
];

describe('Test <Deliveryman /> Page', () => {
  test('Test useEffect get api data', async () => {
    const { getByText, getByTestId } = render(<Deliveryman />);
    apiMock.onGet('couriers').reply(200, dataMock);

    await wait(() => {
      expect(getByText('Bruno')).toBeTruthy();
      expect(getByText('bruno.entregador@gmail.com')).toBeTruthy();
      expect(getByTestId('userImage')).toBeInTheDocument();
    });
  });

  test('Test remove item', async () => {
    const { getByText, debug } = render(<Deliveryman />);
    apiMock.onGet('couriers').reply(200, dataMock);
    apiMock.onDelete(`/couriers/${dataMock[0].id}`).reply(200, {
      message: 'Deliveryman deleted',
      delivery: dataMock[0].id,
    });
    // fireEvent.click(await getByText('Excluir'));
    debug();

    await wait(() => expect(getByText('Bruno')).toBeFalsy());
  });
});

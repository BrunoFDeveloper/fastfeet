import React from 'react';
import { render } from '@testing-library/react-native';

import Input from '~/components/Input/Input';

describe('<Input />', () => {
  test('Should have a input inside', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Input" />);
    expect(getByPlaceholderText('Input')).toBeTruthy();
  });

  test('Should show icon', () => {
    const { getByTestId } = render(<Input icon="event" />);
    expect(getByTestId('iconTest')).toBeTruthy();
  });
});

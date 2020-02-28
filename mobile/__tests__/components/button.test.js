import React from 'react';
import { render } from '@testing-library/react-native';

import Button from '~/components/Button/Button';

describe('<Button />', () => {
  test('Should have text inside button', () => {
    const { getByText } = render(<Button>Test content</Button>);
    expect(getByText('Test content')).toBeTruthy();
  });

  test('Should show loading', () => {
    const { getByTestId } = render(<Button loading>Test content</Button>);
    expect(getByTestId('loading')).toBeTruthy();
  });
});

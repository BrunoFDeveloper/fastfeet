import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Badge from '~/components/Badge/Badge';

afterEach(cleanup);

describe('Test <Badge /> Component', () => {
  test('Should be pedding badge', () => {
    const { getByTestId } = render(<Badge star="true" />);

    expect(getByTestId('badge')).toHaveStyle('background: #f0f0df;');
  });

  test('Should be delivered badge', () => {
    const { getByTestId } = render(<Badge end="true" />);

    expect(getByTestId('badge')).toHaveStyle('background: #dff0df;');
  });
});

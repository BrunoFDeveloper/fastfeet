import React from 'react';
import { render } from '@testing-library/react';

import Badge from '~/components/Badge/Badge';

describe('Test <Badge /> Component', () => {
  test('Should have prop text inside', () => {
    const text = 'Car';
    const { getByText } = render(<Badge text={text} />);

    expect(getByText(text)).toBeTruthy();
  });
});

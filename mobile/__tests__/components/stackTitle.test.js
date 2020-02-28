import React from 'react';
import { render } from '@testing-library/react-native';

import StackTitle from '~/components/StackTitle/StackTitle';

describe('<StackTitle />', () => {
  test('Should have a title inside', () => {
    const { getByText } = render(
      <StackTitle title="Test Title" goBack={() => {}} />
    );
    expect(getByText('Test Title')).toBeTruthy();
  });
});

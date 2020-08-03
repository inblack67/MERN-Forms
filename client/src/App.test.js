import React from 'react';
import { render } from '@testing-library/react';
import Registration from './components/Registration';

describe('Registration', () => {
  it('renders correclty', () => {
    const { asFragment } = render(<Registration />);
    expect(asFragment).toMatchSnapshot();
  })
})

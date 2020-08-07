import React from 'react';
import { render } from '@testing-library/react';
import Home from "./Home";
import 'jest-styled-components';

test('component renders as expected', () => {
  const component = render(<Home />).baseElement;
  expect(component).toMatchSnapshot();
});


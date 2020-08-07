import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from "./Login";
import 'jest-styled-components';

// mocking out the useStoreActions easy-peasy hook
const mockSetState = jest.fn();

jest.mock('easy-peasy', () => ({
  useStoreActions: initial => mockSetState
}));

test('component renders as expected', () => {
  const component = render(<Login />).baseElement;
  expect(component).toMatchSnapshot();
});

test('Entering text in the inputs should show in the component', () => {
  const component = render(<Login />);
  const usernameInput = component.getByPlaceholderText("email");
  const passwordInput = component.getByPlaceholderText("password");
  fireEvent.change(usernameInput, { target: { value: '1two3' } });
  expect(usernameInput.value).toBe('1two3');
  fireEvent.change(passwordInput, { target: { value: '4five6' } });
  expect(passwordInput.value).toBe('4five6');
})

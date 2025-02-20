import { fireEvent, render, screen } from '@testing-library/react';
import ColorPicker from '../ColorPicker';
import { UserDataProvider } from '../../../hooks/useUserData';

test('Renders color picker with default value', () => {
  render(<UserDataProvider><ColorPicker /></UserDataProvider>);
  const colorPicker = screen.getByTestId('colorPicker');
  const colorDisplay = screen.getByTestId('colorDisplay');
  expect(colorPicker).toHaveValue('#000000')
  expect(colorDisplay).toBeInTheDocument();
  expect(colorDisplay).toHaveTextContent('Your chosen color:Black');
});

test('Changes input value', () => {
  render(<UserDataProvider><ColorPicker /></UserDataProvider>);
  const colorPicker = screen.getByTestId('colorPicker');
  fireEvent.input(colorPicker, { target: { value: "#123123" } });
  expect(colorPicker).toHaveValue('#123123');
});

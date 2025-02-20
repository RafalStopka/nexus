import { fireEvent, render, screen } from '@testing-library/react';
import NamePicker from '../NamePicker';
import { UserDataProvider } from '../../../hooks/useUserData';
import { mockValues, mockUpdate } from '../../../constants/testUtils';

test('Renders name picker with correct initial values', () => {
  render(<UserDataProvider><NamePicker values={mockValues} update={mockUpdate}/></UserDataProvider>);
  const namePicker = screen.getByTestId('namePicker');
  const nameDisplay = screen.getByTestId('nameDisplay');
  expect(namePicker).toHaveValue('NN')
  expect(nameDisplay).toBeInTheDocument();
  expect(nameDisplay).toHaveTextContent('Your chosen name:NN');
});

test('Updates user name', () => {
  render(<UserDataProvider><NamePicker values={mockValues} update={mockUpdate}/></UserDataProvider>);
  const namePicker = screen.getByTestId('namePicker');
  const nameDisplay = screen.getByTestId('nameDisplay');
  fireEvent.input(namePicker, {target: { value: 'TestName'}});
  expect(namePicker).toHaveValue('TestName')
  expect(nameDisplay).toBeInTheDocument();
  expect(nameDisplay).toHaveTextContent('Your chosen name:TestName');
});

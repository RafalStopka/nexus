import { fireEvent, render, screen } from '@testing-library/react';
import Grid from '../Grid';
import { UserDataProvider } from '../../../hooks/useUserData';
import { MainContainer } from '../../../containers/mainContainer';
import { mockValues } from '../../../constants/testUtils';

test('Renders initial grid correctly', () => {
  render(<UserDataProvider><Grid values={mockValues}/></UserDataProvider>);
  const gridElements = screen.getAllByTestId(/gridItem/);
  const initialName = screen.getByText(/NN/);
  expect(gridElements.length).toBe(100);
  expect(initialName).toBeInTheDocument();
});

test('Updates user name in the grid', () => {
  render(
  <UserDataProvider>
    <MainContainer/>
  </UserDataProvider>);
  const namePicker = screen.getByTestId('namePicker');
  const testName = screen.getByTestId('selectedGridItem');
  expect(testName).toBeInTheDocument();
  expect(testName).toHaveTextContent('NN')
  fireEvent.input(namePicker, {target: { value: 'TestName'}});
  expect(testName).toBeInTheDocument();
  expect(testName).toHaveTextContent('TestName')
});

test('Updates user position', () => {
  const { container } = render(<UserDataProvider><Grid values={mockValues}/></UserDataProvider>);
  const selectedGridItem = screen.getByTestId('gridItem-5-5');
  expect(selectedGridItem).toBeInTheDocument();
  fireEvent.keyDown(container, {key: 'ArrowUp', code: 'ArrowUp'});
  fireEvent.keyDown(container, {key: 'ArrowRight', code: 'ArrowRight'});
  const newSelectedGridItem = screen.getByTestId('gridItem-4-6');
  expect(newSelectedGridItem).toBeInTheDocument();
});

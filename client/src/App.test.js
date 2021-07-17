import { getByText, render, screen } from '@testing-library/react';
import App from './App';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("this will be like a space travel");
  expect(linkElement).toBeInTheDocument();
})

test('this has a button to begin', () =>{
  render(<App></App>)
  const button = screen.getByText(/begin/i);
  expect(button).toBeInTheDocument();
});

test('this has a button to begin', () =>{
  render(<App></App>)
  const component = screen.getByText(/Dogs/i)
  expect(component).toBeInTheDocument();
});


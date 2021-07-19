import { getByText, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import App from './App';


test('renders learn react link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText("this will be like a space travel");
  expect(linkElement).toBeInTheDocument();
})

test('this has a button to begin', () =>{
  render(<BrowserRouter><App></App></BrowserRouter>)
  const button = screen.getByText(/begin/i);
  expect(button).toBeInTheDocument();
});

test('this has a button to begin', () =>{
  render(<BrowserRouter><App></App></BrowserRouter>)
  const component = screen.getByText(/Dogs/i)
  expect(component).toBeInTheDocument();
});


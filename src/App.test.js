import { render, screen } from '@testing-library/react';
import App from './App';
import {HashRouter} from "react-router-dom";
import ReactDOM from "react-dom";

test('renders learn react link', () => {
  const div = document.createElement('div')
  ReactDOM.render(<HashRouter><App /></HashRouter>,div);
  ReactDOM.unmountComponentAtNode(div)
});

test('Silly test',()=>{
  expect(2+2).toBe(4);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HashRouter><App /></HashRouter>, div);
});
it('renders welcome message', () => {
  render(<HashRouter><App /></HashRouter>);
  expect(screen.getByText('Startside')).toBeInTheDocument();
});
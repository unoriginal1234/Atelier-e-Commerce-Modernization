/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App.jsx';
import Related from '../Related.jsx';
import Card from '../Card.jsx';
import data from './example_data.js';

test('expect Loading to appear on first render', () => {
  const { asFragment, getByText } = render(<Related />);
  expect(getByText(/Loading/i)).toBeInTheDocument();
});

test('expect left to be hidden on page load', () => {
  // const { queryByText } = render(<Related />);
  // const buttonL = queryByText("Left");
  // expect(buttonL).toBeNull();
});

// test('expect secret div to appear when action button is clicked', () => {
//   render(<App />);
//   // const actionButton = card.getElementsByClassName('r-i-secret-btn');
//   fireEvent.click(screen.getByTitle('action'));
//   // const items = await screen.getByText('Compare');
//   // console.log(items);
//   setTimeout(() => {
//     expect(screen.getByText('Compare')).toBeInTheDocument();
//   }, 1000);
// });

test('stars category to be Accessories', async () => {
  const onClick = () => {console.log('clicked')};
  const item = data.relatedItem;
  const pageData = data.pageData;

  const { getByTitle, getByText } = render(<Card item={item} setID={(val) => console.log(val)} clearIndex={console.log('cleared index')} pageData={pageData} type={{type: 'related'}}/>);
  fireEvent.click(screen.getByTitle('action'));
  waitFor(() => getByText("Compare"));
  expect(getByText("Compare")).toBeInTheDocument();
  // expect(getByTitle("action")).toBeInTheDocument();
})
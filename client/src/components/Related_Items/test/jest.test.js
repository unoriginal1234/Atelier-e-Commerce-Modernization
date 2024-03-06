/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App.jsx';
import Related from '../Related.jsx';
import Card from '../Card.jsx';

test('expect Related Items to appear', () => {
  const { asFragment, getByText } = render(<Related />);
  expect(getByText('Related Items')).toBeInTheDocument();
});

test('expect left to be hidden on page load', () => {
  const { queryByText } = render(<Related />);
  const buttonL = queryByText("Left");
  expect(buttonL).toBeNull();
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


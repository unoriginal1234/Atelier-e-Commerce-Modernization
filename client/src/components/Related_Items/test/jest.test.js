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

describe('Card secret functionality', ()=> {
  const onClick = () => {console.log('clicked')};
  const item = data.relatedItem;
  const pageData = data.pageData;

  test('does secret div render when action button is clicked', async () => {
    //Component renderer
    const { getByTitle, getByText } = render(<Card item={item} setID={(val) => console.log(val)} clearIndex={console.log('cleared index')} pageData={pageData} type={{type: 'related'}}/>);

    // //Click hanlder
    fireEvent.click(screen.getByTitle('action'));
    // //Async wait
    waitFor(() => getByText("Compare"));
    //Test expectation
    expect(getByText("Compare")).toBeInTheDocument();
  })

  test('does secret div disappear when action button is clicked twice', async () => {
    //Component renderer
    const { getByTitle, getByText } = render(<Card item={item} setID={(val) => console.log(val)} clearIndex={console.log('cleared index')} pageData={pageData} type={{type: 'related'}}/>);

    // //Click hanlder
    fireEvent.click(screen.getByTitle('action'));
    // //Async wait
    waitFor(() => getByText("Compare"));

    fireEvent.click(screen.getByTitle('action'));

    waitFor(() => getByTitle("r-i-empty-star"));

    //Test expectation
    expect(getByTitle("r-i-empty-star")).toBeInTheDocument();
  })

  test('does the clicking on the card change ID state', async () => {
    const mockSet = jest.fn();
    const { getByTitle, getByText } = render(<Card item={item} setID={mockSet} clearIndex={console.log('cleared index')} pageData={pageData} type={{type: 'related'}}/>);

    fireEvent.click(screen.getByTitle('r-i-image'));

    expect(mockSet.mock.calls).toHaveLength(1);
  })

  test('does clicking any div on the card change ID state', async () => {
    const mockSet = jest.fn();
    const { getByTitle, getByText } = render(<Card item={item} setID={mockSet} clearIndex={console.log('cleared index')} pageData={pageData} type={{type: 'related'}}/>);

    fireEvent.click(screen.getByTitle('r-i-image'));
    fireEvent.click(screen.getByTitle('r-i-cat'));
    fireEvent.click(screen.getByTitle('r-i-name'));
    fireEvent.click(screen.getByTitle('r-i-price'));
    fireEvent.click(screen.getByTitle('r-i-stars'));

    expect(mockSet.mock.calls).toHaveLength(5);
  })
})
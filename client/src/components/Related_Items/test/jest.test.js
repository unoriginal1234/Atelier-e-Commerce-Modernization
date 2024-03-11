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
import appData from './related_example.js';

// test('expect Loading to appear on first render', () => {
//   const { asFragment, getByText } = render(<Related />);
//   expect(getByText(/Loading/i)).toBeInTheDocument();
// });

describe('Related component functionality', () => {
  const token = {
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY,
    }
  };
  const id= 65633;
  const mockFunc = jest.fn();

  test('Does the right arrow appear when there are 5+ related items', async () => {
    const {getByText, getByTitle} = render(<Related token={token} id={id} product={appData.product} productBulk={appData.pagetBulk} data={appData.related} setID={mockFunc}/>);

    waitFor(() => getByTitle('r-i-right'));
    expect(getByTitle('r-i-right')).toBeInTheDocument();
  })

  test('Right and left buttons should only appear when useful', async () => {
    const {getByText, getByTitle} = render(<Related token={token} id={id} product={appData.product} productBulk={appData.pageBulk} data={appData.related} setID={mockFunc}/>);

    waitFor(() => getByTitle('r-i-right'));
    fireEvent.click(screen.getByTitle('r-i-right'));

    waitFor(() => getByTitle('r-i-left'));
    expect(getByTitle('r-i-left')).toBeInTheDocument();
  })

  test('Clicking add to outfit should add current item', async () => {
    const {getByText, getByTitle} = render(<Related token={token} id={id} product={appData.product} productBulk={appData.pageBulk} data={appData.related} setID={mockFunc}/>);

    waitFor(() => getByTitle('r-i-right'));
    fireEvent.click(screen.getByTitle('r-i-add'));

    waitFor(() => getByText("Morning Joggers"));
    expect(getByText('Morning Joggers')).toBeInTheDocument();
  })

  test('You should not be able to add the same item twice', async () => {
    const {getByText, getByTitle} = render(<Related token={token} id={id} product={appData.product} productBulk={appData.pageBulk} data={appData.related} setID={mockFunc}/>);

    waitFor(() => getByTitle('r-i-right'));
    fireEvent.click(screen.getByTitle('r-i-add'));

    waitFor(() => getByText("Morning Joggers"));
    const item = getByText("Morning Joggers");
    fireEvent.click(screen.getByTitle('y-o-delete'));

    waitFor(() => getByText("Morning Joggers").toBeNull());
    expect(item).not.toBeInTheDocument();
  })
})

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

  test('does hovering over the image make the style carousel appear', async () => {
    const mockSet = jest.fn();
    const { getByTitle, getByText } = render(<Card item={item} setID={mockSet} clearIndex={console.log('cleared index')} pageData={pageData} type={{type: 'related'}}/>);

    fireEvent.mouseOver(screen.getByTitle("r-i-image"));

    waitFor(() => getByTitle("r-i-style-carousel"));

    expect(getByTitle("r-i-style-carousel")).toBeInTheDocument();
  })
})
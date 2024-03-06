/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import ProductOverview from '../ProductOverview.jsx'
// import App from '../../App.jsx'

// test('renders App Logo', () => {
//   const {asFragment, getByText} = render(<App />)
//   expect(getByText('KFC Logo')).toBeInTheDocument()
// })

// Jest test
describe('Button component', () => {
  it('calls handleAddToCart function when clicked', () => {
    // Mock the handleAddToCart function
    const handleAddToCart = jest.fn();
    // Render the button component
    const { getByText } = render(<button className="add-to-cart-button" onClick={handleAddToCart}>ADD TO CART</button>);
    // Simulate a click event on the button
    fireEvent.click(getByText('ADD TO CART'));
    // Expect the handleAddToCart function to have been called
    expect(handleAddToCart).toHaveBeenCalled();
  });
});
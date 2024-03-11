/**
 * @jest-environment jsdom
 */

// ProductOverview.test.js
import React from 'react'
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import ProductOverview from '../ProductOverview.jsx'
import fetchData from '../fetchData'; // Import the fetchData function
import Loading from '../Loading'; // Import the fetchData function
import { isValidURL } from '../Utils';

import axios from 'axios'; // Import Axios for mocking

// Mock Axios
jest.mock('axios');


// Jest test
describe('Button component', () => {
  it('calls handleAddToCart function when clicked', () => {
    // Mock the handleAddToCart function
    const handleAddToCart = jest.fn();
    // Render the button component
    const { getByText } = render(<button className="add-to-cart-button" onClick={handleAddToCart}>ADD TO CART</button>);
    // Simulate a click event on the ADD TO CART button
    fireEvent.click(getByText('ADD TO CART'));
    // Expect the handleAddToCart function to have been called
    expect(handleAddToCart).toHaveBeenCalled();
  });
});

describe('ProductOverview Component', () => {
  afterEach(() => {
    // Close any open network connections
    jest.restoreAllMocks(); // Restore any mocked functions
  });

  it('should render without crashing', () => {
    render(<ProductOverview />);
  });

  it('should match snapshot', () => {
    const { container } = render(<ProductOverview />);
    expect(container).toMatchSnapshot();
  });
});

describe('fetchData function', () => {
  it('fetches data successfully', async () => {
    // Mock successful Axios response
    const mockProductData = { id: 1, name: 'Product 1' };
    const mockStylesData = { results: [] };
    const mockReviewsData = { results: [] };
    axios.get.mockResolvedValueOnce({ data: mockProductData })
      .mockResolvedValueOnce({ data: mockStylesData })
      .mockResolvedValueOnce({ data: mockReviewsData });

    // Define mock state setter functions
    const setProductData = jest.fn();
    const setStylesData = jest.fn();
    const setReviewsData = jest.fn();
    const setCurrentStyleId = jest.fn();
    const setSelectedStyle = jest.fn();
    const setAvailableQuantities = jest.fn();
    const setCurrentSKUs = jest.fn();

    // Call fetchData function
    await fetchData(1, {}, setProductData, setStylesData, setReviewsData, setCurrentStyleId, setSelectedStyle, setAvailableQuantities, setCurrentSKUs);

    // Assertions for successful response
    expect(setProductData).toHaveBeenCalledWith(mockProductData);
    expect(setStylesData).toHaveBeenCalledWith(mockStylesData);
    expect(setReviewsData).toHaveBeenCalledWith(mockReviewsData);
    // Add more assertions as needed
  });

  // Inside the fetchData function test case for handling errors gracefully
  it('handles errors gracefully', async () => {
    // Mock error response from Axios
    const errorMessage = 'An error occurred while fetching data. Please try again later.';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    // Define mock state setter functions
    const setProductData = jest.fn();
    const setStylesData = jest.fn();
    const setReviewsData = jest.fn();
    const setCurrentStyleId = jest.fn();
    const setSelectedStyle = jest.fn();
    const setAvailableQuantities = jest.fn();
    const setCurrentSKUs = jest.fn();
    const setError = jest.fn(); // Mock setError function
    const setErrorMessage = jest.fn(); // Mock setErrorMessage function

    // Call fetchData function inside act block
    await act(async () => {
      await fetchData(
        1,
        {}, // Mock authKey
        setProductData,
        setStylesData,
        setReviewsData,
        setCurrentStyleId,
        setSelectedStyle,
        setAvailableQuantities,
        setCurrentSKUs,
        setError,
        setErrorMessage
      );
    });

    // Assertions for error handling
    expect(setProductData).not.toHaveBeenCalled();
    expect(setStylesData).not.toHaveBeenCalled();
    expect(setReviewsData).not.toHaveBeenCalled();
    // Check if error state is set
    expect(setError).toHaveBeenCalledWith(true);
    expect(setErrorMessage).toHaveBeenCalledWith(errorMessage);
  });
});

test('renders a Loading message', () => {
  const {asFragment, getByText} = render(<Loading />)
  expect(getByText('Loading...')).toBeInTheDocument()
});


describe('isValidURL', () => {
  it('returns true for a valid URL with http protocol', () => {
    const url = 'http://www.example.com';
    expect(isValidURL(url)).toBe(true);
  });

  it('returns true for a valid URL with https protocol', () => {
    const url = 'https://www.example.com';
    expect(isValidURL(url)).toBe(true);
  });

  it('returns true for a valid URL with query string', () => {
    const url = 'https://www.example.com/?query=param';
    expect(isValidURL(url)).toBe(true);
  });

  it('returns false for an empty URL', () => {
    const url = '';
    expect(isValidURL(url)).toBe(false);
  });

  it('returns false for a URL with invalid characters', () => {
    const url = 'ht*p://www.example.com';
    expect(isValidURL(url)).toBe(false);
  });

  it('returns false for a URL without protocol', () => {
    const url = 'www.example.com';
    expect(isValidURL(url)).toBe(false);
  });

  it('returns false for a URL without domain', () => {
    const url = 'http://';
    expect(isValidURL(url)).toBe(false);
  });

  it('returns false for a URL with incomplete domain', () => {
    const url = 'http://example';
    expect(isValidURL(url)).toBe(false);
  });

  it('returns true for a valid IP address', () => {
    const url = 'http://127.0.0.1';
    expect(isValidURL(url)).toBe(true);
  });

  it('returns false for an invalid IP address', () => {
    const url = 'http://256.0.0.1';
    expect(isValidURL(url)).toBe(false);
  });

  it('returns true for a valid URL with fragment', () => {
    const url = 'http://www.example.com/#fragment';
    expect(isValidURL(url)).toBe(true);
  });

  it('returns true for a valid URL with port', () => {
    const url = 'http://www.example.com:8080';
    expect(isValidURL(url)).toBe(true);
  });

  it('returns true for a valid URL with path', () => {
    const url = 'http://www.example.com/path';
    expect(isValidURL(url)).toBe(true);
  });
});

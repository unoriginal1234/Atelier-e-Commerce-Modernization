import React from 'react'
import {render, screen, getByLabelText, getByTitle, waitFor, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import axios from 'axios';
import App from './App.jsx';


jest.mock('axios');

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders loading state initially', () => {
    render(<App />);
    waitFor(()=> {
      expect(screen.getByTitle('main-container')).toBeInTheDocument();
      expect(screen.getByTitle('widget-container nav-bar')).toBeInTheDocument();
      expect(screen.getByLabelText('KFC Logo')).toBeInTheDocument();
      expect(screen.getByTitle('fake-search')).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
      expect(screen.getByLabelText('IoSearch')).toBeInTheDocument();
      expect(screen.getByLabelText('IoSearch')).toHaveAttribute('onClick');
      expect(screen.getByTitle('searchIcon')).toBeInTheDocument();
      expect(screen.getByLabelText('PiBagBold')).toBeInTheDocument();
      expect(screen.getByTitle('cart-info-icon')).toBeInTheDocument();
      expect(screen.getByTitle('global-announsment')).toBeInTheDocument();
      expect(screen.getByLabelText('SITE-WIDE ANNOUSNMENT MESSAGE ')).toBeInTheDocument();
      expect(screen.getByLabelText('SALE')).toBeInTheDocument();
      expect(screen.getByLabelText('DISCOUNT')).toBeInTheDocument();
      expect(screen.getByLabelText('OFFER')).toBeInTheDocument();
      expect(screen.getByLabelText('NEW PRODUCT HIGHLIGHT')).toBeInTheDocument();
      expect(screen.getByTitle('widget-container p-o')).toBeInTheDocument();
      expect(screen.getByLabelText('ProductOverview')).toHaveAttribute('setCartData');
      expect(screen.getByLabelText('ProductOverview')).toHaveAttribute('authKey');
      expect(screen.getByLabelText('ProductOverview')).toHaveAttribute('id');
      expect(screen.getByLabelText('ProductOverview')).toHaveAttribute('onClickReadAllReviews');
      expect(screen.getByTitle('widget-container r-i-container')).toBeInTheDocument();
      expect(screen.getByLabelText('Related')).toHaveAttribute('id');
      expect(screen.getByLabelText('Related')).toHaveAttribute('product');
      expect(screen.getByLabelText('Related')).toHaveAttribute('productBulk');
      expect(screen.getByLabelText('Related')).toHaveAttribute('data');
      expect(screen.getByLabelText('Related')).toHaveAttribute('setID');
      expect(screen.getByTitle('widget-container')).toBeInTheDocument();
      expect(screen.getByLabelText('RatingsAndReviews')).toHaveAttribute('id');
      expect(screen.getByLabelText('RatingsAndReviews')).toHaveAttribute('token');
      expect(screen.getByLabelText('RatingsAndReviews')).toHaveAttribute('ref');
      expect(screen.getByTitle('widget-container')).toBeInTheDocument();
      expect(screen.getByLabelText('QuestionsAndAnswers')).toHaveAttribute('id');
      expect(screen.getByLabelText('QuestionsAndAnswers')).toHaveAttribute('token');
      expect(screen.getByLabelText('QuestionsAndAnswers')).toHaveAttribute('productData');
    })
    test('updates productID state when search input changes', () => {
      render(<App />);

      const searchInput = screen.getByPlaceholderText('Search');
      fireEvent.change(searchInput, { target: { value: '12345' } });

      expect(searchInput).toHaveValue('12345');
    });
    test('scrolls to RatingsAndReviews section when "Read All Reviews" is clicked', () => {
      render(<App />);

      const readAllReviewsButton = screen.getByText('Read All Reviews');
      fireEvent.click(readAllReviewsButton);

      // Assuming there is a specific element in RatingsAndReviews section to check for scroll
      // You can customize this based on your actual implementation
      expect(screen.getByLabelText('ratings-and-reviews-section')).toBeVisible();
    });
    test('displays error message when API request fails', () => {
      axios.get.mockRejectedValueOnce(new Error('API request failed'));

      render(<App />);

      waitFor(() => expect(screen.getByText('We couldn\'t find what you are looking for...')).toBeInTheDocument());
    });
  });

})
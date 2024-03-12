
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductInformation from '../ProductInformation.jsx';

describe('ProductInformation', () => {
  const productData = {
    category: 'Clothing',
    name: 'Example Product',
  };

  const reviewsData = {
    ratings: {
      1: 10,
      2: 20,
      3: 30,
      4: 40,
      5: 50,
    },
  };

  const selectedStyle = {
    name: 'Example Style',
    original_price: 50,
    sale_price: 40,
  };

  const onClickReadAllReviewsMock = jest.fn();

  it('renders product information correctly', () => {
    const { getByText } = render(
      <ProductInformation
        productData={productData}
        reviewsData={reviewsData}
        selectedStyle={selectedStyle}
        onClickReadAllReviews={onClickReadAllReviewsMock}
      />
    );
    expect(getByText(productData.category)).toBeInTheDocument();
    expect(getByText(productData.name)).toBeInTheDocument();
    expect(getByText(selectedStyle.name)).toBeInTheDocument();
    expect(getByText(`$${selectedStyle.sale_price}`)).toBeInTheDocument();
    expect(getByText(`$${selectedStyle.original_price}`)).toBeInTheDocument();
  });

  it('calls onClickReadAllReviews when "Read all reviews" link is clicked', () => {
    const { getByText } = render(
      <ProductInformation
        productData={productData}
        reviewsData={reviewsData}
        selectedStyle={selectedStyle}
        onClickReadAllReviews={onClickReadAllReviewsMock}
      />
    );
    const readAllReviewsLink = getByText(`Read all ${Object.values(reviewsData.ratings).reduce((acc, cur) => acc + cur, 0)} reviews`);
    fireEvent.click(readAllReviewsLink);
    expect(onClickReadAllReviewsMock).toHaveBeenCalled();
  });
});

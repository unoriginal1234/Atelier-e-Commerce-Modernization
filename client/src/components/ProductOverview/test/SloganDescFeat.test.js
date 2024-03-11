/**
 * @jest-environment jsdom
 */


import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import SloganDescFeat from '../SloganDescFeat.jsx';

describe('SloganDescFeat Component', () => {
  const productData = {
    slogan: 'Test Slogan',
    description: 'Test Description',
    features: [
      { feature: 'Feature 1', value: 'Value 1' },
      { feature: 'Feature 2', value: 'Value 2' },
      { feature: 'Feature 3', value: 'Value 3' },
    ],
  };

  it('renders without crashing', () => {
    render(<SloganDescFeat productData={productData} />);
  });

  it('displays the slogan and description', () => {
    const { getByText } = render(<SloganDescFeat productData={productData} />);
    expect(getByText('Test Slogan')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });

  it('displays all features', () => {
    const { getByText } = render(<SloganDescFeat productData={productData} />);
    expect(getByText('Feature 1 Value 1')).toBeInTheDocument();
    expect(getByText('Feature 2 Value 2')).toBeInTheDocument();
    expect(getByText('Feature 3 Value 3')).toBeInTheDocument();
  });

  it('handles missing features in productData', () => {
    // Test when productData.features is missing
    const productDataWithoutFeatures = {
      slogan: 'Test Slogan',
      description: 'Test Description',
      // features is missing
    };
    const { getByText, queryByText } = render(<SloganDescFeat productData={productDataWithoutFeatures} />);
    expect(getByText('Test Slogan')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    // Ensure that no features are rendered
    expect(queryByText('Feature 1 Value 1')).not.toBeInTheDocument();
    expect(queryByText('Feature 2 Value 2')).not.toBeInTheDocument();
    expect(queryByText('Feature 3 Value 3')).not.toBeInTheDocument();
  });

});

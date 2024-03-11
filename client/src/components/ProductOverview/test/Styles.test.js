/**
 * @jest-environment jsdom
 */

// Styles.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Styles from '../Styles.jsx';

describe('Styles Component', () => {
  const styles = [
    { style_id: 1, photos: [{ thumbnail_url: 'https://example.com/image1.jpg' }] },
    { style_id: 2, photos: [{ thumbnail_url: 'https://example.com/image2.jpg' }] },
    { style_id: 3, photos: [{ thumbnail_url: 'https://example.com/image3.jpg' }] }
  ];

  const currentStyleId = 2;
  const handleStyleChange = jest.fn();

  it('renders without crashing', () => {
    render(<Styles styles={styles} currentStyleId={currentStyleId} handleStyleChange={handleStyleChange} />);
  });

  it('renders correct number of style thumbnails', () => {
    const { getAllByTestId } = render(<Styles styles={styles} currentStyleId={currentStyleId} handleStyleChange={handleStyleChange} />);
    const thumbnails = getAllByTestId(/^style-thumbnail-\d+$/); // Updated selector to match unique data-testid values
    expect(thumbnails).toHaveLength(styles.length);
  });

  it('applies "selected" class to current style thumbnail', () => {
    const { getByTestId } = render(<Styles styles={styles} currentStyleId={currentStyleId} handleStyleChange={handleStyleChange} />);
    const selectedThumbnail = getByTestId(`style-thumbnail-${currentStyleId}`);
    expect(selectedThumbnail).toHaveClass('selected');
  });

  it('triggers handleStyleChange function with correct style_id on thumbnail click', () => {
    const { getByTestId } = render(<Styles styles={styles} currentStyleId={currentStyleId} handleStyleChange={handleStyleChange} />);
    const thumbnail = getByTestId(`style-thumbnail-${styles[0].style_id}`);
    fireEvent.click(thumbnail);
    expect(handleStyleChange).toHaveBeenCalledWith(styles[0].style_id);
  });
});

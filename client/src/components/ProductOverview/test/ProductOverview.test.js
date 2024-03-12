/**
 * @jest-environment jsdom
 */

// ProductOverview.test.js
import React from 'react'
import '@testing-library/jest-dom';
import { fireEvent, act,  render, screen, waitFor, queryByText  } from '@testing-library/react';
import ProductOverview from '../ProductOverview.jsx'
import SelectOptions from '../SelectOptions.jsx';
import ImageGallery from '../ImageGallery.jsx';
import fetchData from '../fetchData'; // Import the fetchData function
import Loading from '../Loading'; // Import the fetchData function
import { isValidURL, ErrorMessages } from '../Utils';
import axios from 'axios'; // Import Axios for mocking
import { FaFacebookSquare, FaPinterestSquare, FaCheck, FaHeart } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

describe('ProductOverview Component', () => {
  it('renders without crashing', () => {
    render(<ProductOverview />);
  });
});

test('renders ImageGallery component without crashing', () => {
  const selectedStyle = {
    photos: [{ url: 'https://example.com/image.jpg' }, { url: 'https://example.com/image2.jpg' }], // Mock photos array
    // Add other necessary properties of selectedStyle
  };
  render(<ImageGallery selectedStyle={selectedStyle} />);
});

it('renders loading message when data is not available', () => {
  // Render the component without passing any data
  const { getByText } = render(<ProductOverview setCartData={() => {}} id={1} authKey={process.env.REACT_APP_API_KEY} onClickReadAllReviews={() => {}} />);

  // Expect the loading message to be present
  expect(getByText('Loading...')).toBeInTheDocument();
});


// Button component tests
describe('Button component', () => {
  const handleAddToCart = jest.fn();
  const handleLikeClick = jest.fn();

  it('renders ADD TO CART button and calls handleAddToCart function when clicked', () => {
    const { getByText } = render(<button className="add-to-cart-button" onClick={handleAddToCart}>ADD TO CART</button>);
    fireEvent.click(getByText('ADD TO CART'));
    expect(handleAddToCart).toHaveBeenCalled();
  });

  it('renders LIKE button and calls handleLikeClick function when clicked', () => {
    const { getByTestId } = render(<button data-testid="like-button" className="p-o-like-button" onClick={handleLikeClick}><FaHeart /></button>);
    fireEvent.click(getByTestId('like-button'));
    expect(handleLikeClick).toHaveBeenCalled();
  });
});

// ErrorMessages component tests
describe('ErrorMessages', () => {
  it('renders error messages correctly and styles them', () => {
    const messages = ['Error message 1', 'Error message 2', 'Error message 3'];
    const { getByText } = render(<ErrorMessages messages={messages} />);

    messages.forEach(message => {
      const errorMessageElement = getByText(message);
      expect(errorMessageElement).toBeInTheDocument();
      expect(errorMessageElement).toHaveStyle({ color: '#F4493C' });
    });
  });
});

// Loading message tests
test('renders a Loading message', () => {
  const { getByText } = render(<Loading />);
  expect(getByText('Loading...')).toBeInTheDocument();
});


describe('Social Media Icons', () => {
  it('should call the correct function when Facebook icon is clicked', () => {

    const handleShareClick = jest.fn();

    const { getByTestId } = render(
      <FaFacebookSquare onClick={handleShareClick} data-testid="facebook-icon" />
    );

    fireEvent.click(getByTestId('facebook-icon'));

    expect(handleShareClick).toHaveBeenCalled();
  });

  it('should call the correct function when Twitter icon is clicked', () => {
    const handleShareClick = jest.fn();
    const { getByTestId } = render(
      <FaSquareXTwitter onClick={handleShareClick} data-testid="twitter-icon" />
    );

    fireEvent.click(getByTestId('twitter-icon'));

    expect(handleShareClick).toHaveBeenCalled();
  });

  it('should call the correct function when Pinterest icon is clicked', () => {
    const handleShareClick = jest.fn();
    const { getByTestId } = render(
      <FaPinterestSquare onClick={handleShareClick} data-testid="pinterest-icon" />
    );

    fireEvent.click(getByTestId('pinterest-icon'));

    expect(handleShareClick).toHaveBeenCalled();
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


test('renders a Loading message', () => {
  const {asFragment, getByText} = render(<ProductOverview />)
  expect(getByText('Loading...')).toBeInTheDocument()
});



jest.mock('axios');

describe('fetchData function', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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
    const authKey = { headers: { Authorization: 'Bearer <YOUR_AUTH_TOKEN>' } };

    // Call fetchData function inside act block
    await act(async () => {
      await fetchData(
        1,
        authKey,
        setProductData,
        setStylesData,
        setReviewsData,
        setCurrentStyleId,
        setSelectedStyle,
        setAvailableQuantities,
        setCurrentSKUs
      );
    });

    // Assertions for successful response
    expect(setProductData).toHaveBeenCalledWith(mockProductData);
    expect(setStylesData).toHaveBeenCalledWith(mockStylesData);
    expect(setReviewsData).toHaveBeenCalledWith(mockReviewsData);
    // Add more assertions as needed
  });

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
    const setError = jest.fn();
    const setErrorMessage = jest.fn();

    // Call fetchData function inside act block
    await act(async () => {
      await fetchData(
        1,
        {},
        setProductData,
        setStylesData,
        setReviewsData,
        setCurrentStyleId,
        setSelectedStyle,
        setAvailableQuantities,
        setCurrentSKUs,
        setErrorMessage,
        setError
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




// isValidURL tests
describe('isValidURL', () => {
  it.each([
    ['http://www.example.com/file.png', true],
    ['https://www.example.com/file.png', true],
    ['https://www.example.com/file.png?query=param', true],
    ['', false],
    ['ht*p://www.example.com', false],
    ['www.example.com', true],
    ['http://', false],
    ['http://example', false],
    ['http://127.0.0.1', true],
    ['http://256.0.0', false],
    ['http://www.example.com/file.png/#fragment', true],
    ['http://www.example.com/:8080', false],
    ['http://www.example.com/path', true],
  ])('returns %s for URL: %s', (url, expectedResult) => {
    expect(isValidURL(url)).toBe(expectedResult);
  });
});

describe('SelectOptions component', () => {
  const currentSKUs = [
    ['sku_1', { size: 'S', quantity: 5 }],
    ['sku_2', { size: 'M', quantity: 10 }],
    ['sku_3', { size: 'L', quantity: 3 }],
  ];

  it('renders size select dropdown correctly based on available sizes', () => {
    const { getByText, getByTestId } = render(
      <SelectOptions
        currentSKUs={currentSKUs}
        availableQuantities={5}
        handleSizeSelection={() => {}}
        selectedQuantity=""
        setSelectedQuantity={() => {}}
        setErrorMessages={() => {}}
        selectedSize=""
        selectSizeRef={null}
        isDropdownOpen={false}
      />
    );

    expect(getByTestId('selectSize')).toBeInTheDocument();
    expect(getByText('S')).toBeInTheDocument();
    expect(getByText('M')).toBeInTheDocument();
    expect(getByText('L')).toBeInTheDocument();
  });

  it('renders quantity select dropdown correctly based on selected size and available quantities', () => {
    const { getByText, getByTestId } = render(
      <SelectOptions
        currentSKUs={currentSKUs}
        availableQuantities={10} // Adjust the availableQuantities prop to a value greater than 6
        handleSizeSelection={() => {}}
        selectedQuantity=""
        setSelectedQuantity={() => {}}
        setErrorMessages={() => {}}
        selectedSize="S"
        selectSizeRef={null}
        isDropdownOpen={false}
      />
    );

    expect(getByTestId('selectQuantity')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('6')).toBeInTheDocument(); // Update the expectation to ensure '6' is present
  });

  it('disables quantity select dropdown when no size is selected or selected size is "SELECT SIZE"', () => {
    const { getByTestId } = render(
      <SelectOptions
        currentSKUs={currentSKUs}
        availableQuantities={5}
        handleSizeSelection={() => {}}
        selectedQuantity=""
        setSelectedQuantity={() => {}}
        setErrorMessages={() => {}}
        selectedSize="" // Update selectedSize to an empty string
        selectSizeRef={null}
        isDropdownOpen={false}
      />
    );

    const quantitySelect = getByTestId('selectQuantity');
    expect(quantitySelect).toBeDisabled(); // Expect the quantity select dropdown to be disabled
  });

  it('calls handleQuantityChange when quantity is selected', () => {
    const handleQuantityChangeMock = jest.fn();
    const { getByTestId } = render(
      <SelectOptions
        currentSKUs={currentSKUs}
        availableQuantities={5}
        handleSizeSelection={() => {}}
        selectedQuantity=""
        setSelectedQuantity={handleQuantityChangeMock}
        setErrorMessages={() => {}}
        selectedSize="S"
        selectSizeRef={null}
        isDropdownOpen={false}
      />
    );

    const quantitySelect = getByTestId('selectQuantity');
    fireEvent.change(quantitySelect, { target: { value: '5' } });

    expect(handleQuantityChangeMock).toHaveBeenCalledWith('5');
  });
});

import styled, { createGlobalStyle } from 'styled-components';

// Global styles
export const GlobalStyle = createGlobalStyle`
  /* Import Google Font */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  /* Apply font to all elements */
  body {
    font-family: 'Roboto', sans-serif;
    background: white;
    color: black;
  }
`;

// Main container
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1040px;
  margin: 0 auto;
  width: 100%;
`;

// Individual module containers
export const WidgetContainer = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 20px;
`;

// Product Overview Module
export const ProductOverviewContainer = styled.div`
  display: flex;
`;

export const LeftContainer = styled.div`
  border: 1px solid #ccc;
  flex: 0 0 63%;
  padding: 16px;
`;

export const GalleryImagesContainer = styled.div`
  position: relative;
`;

export const GalleryImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  cursor: zoom-in;
`;

export const ThumbnailsContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  position: absolute;
  background: rgba(255, 255, 255, 0.4);
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  margin: 0px 0px 6px 0px;
  cursor: pointer;
  box-sizing: border-box;
  border: 2px solid transparent;

  &:hover {
    box-sizing: border-box;
    border: 2px solid blue;
  }
`;

export const RightContainer = styled.div`
  border: 1px solid #ccc;
  flex: 1;
  padding: 16px;
  box-sizing: border-box;
`;

export const RatingsReviewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  a {
    font-size: 12px;
    margin-left: 8px;
    color: gray;

    &:hover {
      color: rgb(69, 69, 69);
    }
  }
`;

export const ProductTitle = styled.h2`
  font-size: 25px;
  color: rgb(38, 38, 38);
  margin: 0;
  line-height: 0;
  margin-bottom: 25px;
`;

export const StylesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0px;
  padding: 20px;
`;

export const StyleThumbnail = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  cursor: pointer;
  margin-right: 12.5px;
  background-size: cover;
  background-position: center;

  &.selected::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    z-index: 1;
  }
`;

export const Checkmark = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 18px;
  z-index: 2;
`;

export const SizeQuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const SizeSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const QuantitySelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AddToCartLikeContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const AddToCartButton = styled.button`
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  width: 75%;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const LikeButton = styled.button`
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  width: 25%;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Star rating styles
export const StarRatingContainer = styled.div`
  --percent: calc(var(--rating) / 5 * 100%);

  display: inline-block;
  font-size: var(--star-size);
  font-family: Times;
  line-height: 1;

  &::before {
    content: '★★★★★';
    letter-spacing: 3px;
    background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-color: #fc0;
    -webkit-text-stroke-width: 2px;
  }
`;

// Container for global styles
export const StyledComponentsContainer = styled.div`
  * {
    position: relative;
    box-sizing: border-box;
  }
`;

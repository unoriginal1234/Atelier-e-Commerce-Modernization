import React, { useState } from 'react';
import styled, { css } from 'styled-components';

// Styled components for the Image Gallery
const GalleryImagesContainer = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
`;

const GalleryImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  cursor: ${({ isZoomed }) => (isZoomed ? 'zoom-out' : 'zoom-in')};
  transition: transform 0.2s ease-in-out;

  ${({ isZoomed }) =>
    isZoomed &&
    css`
      transform: scale(1.5); /* Adjust the scale factor as needed */
    `}
`;
// .gallery-images-conteiner{
//   background: rgb(232, 232, 232);
//   width: 100%;
//   height: 100%;
//   display: block;
//   box-sizing: border-box;
// }

const ThumbnailsContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  position: absolute;
  width: 80px;
  height: calc(100% - 32px);
  left: 16px;
  top: 16px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.4);
  overflow-y: auto;
  z-index: 1;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  margin: 0px 0px 6px 0px;
  cursor: pointer;
  box-sizing: border-box;
  border: 2px solid transparent;

  ${(props) =>
    props.selected &&
    css`
      border-color: blue;
    `}
`;

const LeftArrow = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  z-index: 1;
`;

const RightArrow = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  z-index: 1;
`;

const ExpandedOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ExpandedImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  cursor: zoom-out;
`;

const ImageGallery = ({ selectedStyle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleImageNavigation = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : selectedStyle.photos.length - 1));
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex < selectedStyle.photos.length - 1 ? prevIndex + 1 : 0));
    }
  };

  const handleImageClick = () => {
    setIsExpanded(true);
  };

  const handleCloseExpandedView = () => {
    setIsExpanded(false);
  };
  let noImageAvailable = 'https://tse4.mm.bing.net/th/id/OIG4.d5j1eGp1XNI8NlPNgqbR?pid=ImgGn';
  return (
    <div className="p-o-left">
      <GalleryImagesContainer>
        <GalleryImage src={selectedStyle.photos[currentImageIndex].url === null ? noImageAvailable : selectedStyle.photos[currentImageIndex].url} alt="Product" onClick={handleImageClick} />
        <ThumbnailsContainer>
          {selectedStyle.photos.map((photo, index) => (
            <ThumbnailImage
              key={index}
              src={photo.thumbnail_url}
              alt={`Thumbnail ${index}`}
              onClick={() => handleThumbnailClick(index)}
              selected={currentImageIndex === index}
            />
          ))}
        </ThumbnailsContainer>
        <LeftArrow onClick={() => handleImageNavigation('prev')}>◄</LeftArrow>
        <RightArrow onClick={() => handleImageNavigation('next')}>►</RightArrow>
        {isExpanded && (
          <ExpandedOverlay onClick={handleCloseExpandedView}>
            <ExpandedImage src={selectedStyle.photos[currentImageIndex].url} alt="Expanded Product" />
          </ExpandedOverlay>
        )}
      </GalleryImagesContainer>
    </div>
  );
};

export default ImageGallery;

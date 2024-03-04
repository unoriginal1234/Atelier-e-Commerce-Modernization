import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const DefaultGalleryContainer = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
`;

const DefaultGalleryImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  ${({ isZoomed }) =>
    isZoomed &&
    css`
      transform: scale(2.5);
    `}
`;

const DefaultThumbnailsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const DefaultThumbnailImage = styled.img`
  width: 50px;
  height: auto;
  margin-right: 6px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? '2px solid blue' : '2px solid transparent')};
`;

const DefaultImageGallery = ({ selectedStyle, currentImageIndex, setCurrentImageIndex }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [selectedStyle]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setIsZoomed(false);
  };

  return (
    <DefaultGalleryContainer>
      <DefaultGalleryImage
        src={selectedStyle?.photos[currentImageIndex]?.url}
        alt="Product"
        onClick={() => setIsZoomed(!isZoomed)}
        isZoomed={isZoomed}
      />
      <DefaultThumbnailsContainer>
        {selectedStyle?.photos.map((photo, index) => (
          <DefaultThumbnailImage
            key={index}
            src={photo.thumbnail_url}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbnailClick(index)}
            selected={currentImageIndex === index}
          />
        ))}
      </DefaultThumbnailsContainer>
    </DefaultGalleryContainer>
  );
};

export default DefaultImageGallery;

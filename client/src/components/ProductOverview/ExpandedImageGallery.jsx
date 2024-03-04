import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  cursor: ${({ isZoomed }) => (isZoomed ? 'zoom-out' : 'zoom-in')};
`;

const ExpandedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: ${({ isZoomed }) => (isZoomed ? '-' : '+')};
  transition: transform 0.2s ease-in-out;

  &:hover {
    cursor: ${({ isZoomed }) => (isZoomed ? '-' : '+')};
  }

  ${({ isZoomed, mouseX, mouseY }) =>
    isZoomed &&
    mouseX &&
    mouseY &&
    `
    transform-origin: ${mouseX}px ${mouseY}px;
    transform: scale(2.5);
  `}
`;

const ExpandedImageGallery = ({ selectedStyle, currentImageIndex }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);

  useEffect(() => {
    setIsZoomed(false);
    setMouseX(null);
    setMouseY(null);
  }, [selectedStyle]);

  const handleImageClick = (e) => {
    if (!isZoomed) {
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setMouseX(offsetX);
      setMouseY(offsetY);
    }
    setIsZoomed(!isZoomed);
  };

  const handleCloseExpandedView = () => {
    setIsZoomed(false);
    setMouseX(null);
    setMouseY(null);
  };

  return (
    <ExpandedOverlay isZoomed={isZoomed} onClick={handleCloseExpandedView}>
      <ExpandedImage
        src={selectedStyle?.photos[currentImageIndex]?.url}
        alt="Expanded Product"
        onClick={handleImageClick}
        isZoomed={isZoomed}
        mouseX={mouseX}
        mouseY={mouseY}
      />
    </ExpandedOverlay>
  );
};

export default ExpandedImageGallery;

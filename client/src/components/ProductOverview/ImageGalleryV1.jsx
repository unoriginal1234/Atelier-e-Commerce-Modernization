import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { RiArrowLeftSLine, RiArrowRightSLine, RiArrowDownSLine } from 'react-icons/ri';
import ReactImageZoom from 'react-image-zoom'; // more info about react-image-zoom -> https://www.npmjs.com/package/react-image-zoom
// react-image-zoom demo: https://malaman.github.io/react-image-zoom/example/index.html

// Styled components for the Image Gallery
const GalleryImagesContainer = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
`;

const GalleryImage = styled.img`
  border-radius: 4px;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  cursor: ${({ isZoomed }) => (isZoomed ? 'zoom-out' : 'zoom-in')};
  transition: transform 0.2s ease-in-out;

  ${({ isZoomed }) =>
    isZoomed &&
    css`
      transform: scale(1.5);
    `}
`;

const ThumbnailsContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 8px 6px 0px 6px;
  border-radius: 4px;
  position: absolute;
  width: 80px;
  height: -webkit-fill-available;
  left: 16px;
  top: 16px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  z-index: 1;

  /* Updated styles for custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  margin: 0px 0px 6px 0px;
  cursor: pointer;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: 4px;

  ${(props) =>
    props.selected &&
    css`
      border-color: #174d7c;
    `}
`;

const DownArrowButton = styled.button`
  /* Styles for the down arrow button */
  display: ${({ showScroll }) => (showScroll ? 'block' : 'none')};
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const ArrowButton = styled.button`
  /* Common styles for arrow buttons */
  position: absolute;
  top: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  font-size: 25px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: box-shadow 0.3s ease;

  /* Styles for non-expanded view */
  ${({ isExpanded }) =>
    !isExpanded &&
    css`
      /* Adjust the positioning of the arrows in non-expanded view */
      ${({ left }) =>
        left
          ? css`
              left: 110px; /* Default value for non-expanded view */
              transform: translateY(-50%);
            `
          : css`
              right: 12px; /* Default value for non-expanded view */
              transform: translateY(-50%);
            `}
    `}

  /* Styles for expanded view */
  ${({ isExpanded }) =>
    isExpanded &&
    css`
      /* Adjust the positioning of the arrows in non-expanded view */
      ${({ left }) =>
        left
          ? css`
              left: 12px; /* Default value for non-expanded view */
              transform: translateY(-50%);
            `
          : css`
              right: 12px; /* Default value for non-expanded view */
              transform: translateY(-50%);
            `}
    `}

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;

const LeftArrowIcon = styled(RiArrowLeftSLine)`
  color: #333;
`;

const RightArrowIcon = styled(RiArrowRightSLine)`
  color: #333;
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

const ExpandedImageContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [showScroll, setShowScroll] = useState(false);
  const thumbnailsContainerRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleImageNavigation = (direction) => {
    const length = selectedStyle.photos.length;
    setCurrentImageIndex((prevIndex) =>
      direction === 'prev' ? (prevIndex + length - 1) % length : (prevIndex + 1) % length
    );
  };

  const handleImageClick = () => {
    setIsExpanded(true);
  };

  const handleCloseExpandedView = () => {
    setIsExpanded(false);
  };

  const handleScrollThumbnails = () => {
    thumbnailsContainerRef.current.scrollTop += 400; // This needs to be fixed. Currently not working
  };

  useEffect(() => {
    const container = thumbnailsContainerRef.current;
    setShowScroll(container.scrollHeight > container.clientHeight);
  }, [selectedStyle.photos]);

  const noImageAvailable =
    'https://tse4.mm.bing.net/th/id/OIG4.d5j1eGp1XNI8NlPNgqbR?pid=ImgGn';

  return (
    <div className="p-o-left">
      <GalleryImagesContainer>
        <GalleryImage
          src={selectedStyle.photos[currentImageIndex]?.url || noImageAvailable}
          alt="Product"
          onClick={handleImageClick}
        />
        <ThumbnailsContainer ref={thumbnailsContainerRef}>
          {selectedStyle.photos.map((photo, index) => (
            <ThumbnailImage
              key={index}
              src={photo.thumbnail_url}
              alt={`Thumbnail ${index}`}
              onClick={() => handleThumbnailClick(index)}
              selected={currentImageIndex === index}
            />
          ))}
          {/* Down arrow button to scroll thumbnails */}
          <DownArrowButton showScroll={showScroll} onClick={handleScrollThumbnails}>
            <RiArrowDownSLine />
          </DownArrowButton>
        </ThumbnailsContainer>
        <ArrowButton isExpanded={isExpanded} $isLeft left onClick={() => handleImageNavigation('prev')}>
          <LeftArrowIcon />
        </ArrowButton>
        <ArrowButton isExpanded={isExpanded} onClick={() => handleImageNavigation('next')}>
          <RightArrowIcon />
        </ArrowButton>
        {isExpanded && (
          <ExpandedOverlay onClick={handleCloseExpandedView}>
            <ExpandedImageContainer>
              <ArrowButton isExpanded={isExpanded} $isLeft left onClick={(e) => { e.stopPropagation(); handleImageNavigation('prev'); }}>
                <LeftArrowIcon />
              </ArrowButton>
              <ArrowButton isExpanded={isExpanded} onClick={(e) => { e.stopPropagation(); handleImageNavigation('next'); }}>
                <RightArrowIcon />
              </ArrowButton>
              <ReactImageZoom
                zoomPosition={'original'}
                img={selectedStyle.photos[currentImageIndex]?.url || noImageAvailable}
                zoomScale={2} // Adjust the zoom scale as needed
                width={500} // Adjust the width of the zoomed image container as needed// Adjust the height of the zoomed image container as needed
              />
              <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
                {selectedStyle.photos.map((photo, index) => (
                  <ThumbnailImage
                    key={index}
                    src={photo.thumbnail_url}
                    alt={`Thumbnail ${index}`}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                    selected={currentImageIndex === index}
                    style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', border: index === currentImageIndex ? '2px solid #00f' : '2px solid transparent' }}
                  />
                ))}
              </div>
            </ExpandedImageContainer>
          </ExpandedOverlay>
        )}
      </GalleryImagesContainer>
    </div>
  );
};

export default ImageGallery;

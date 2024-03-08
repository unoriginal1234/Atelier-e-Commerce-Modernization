import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import ReactImageZoom from 'react-image-zoom'; // more info about react-image-zoom -> https://www.npmjs.com/package/react-image-zoom
// react-image-zoom demo: https://malaman.github.io/react-image-zoom/example/index.html

const ImageGallery = ({ selectedStyle, currentStyleId }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Image Gallery staff
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [backgroundPositionY, setBackgroundPositionY] = useState('center');
  const [isExpanded, setIsExpanded] = useState(false);



  const toggleGallery = () => {
    setIsGalleryExpanded(prevState => !prevState);
  };

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
    if (isExpanded) {
      setIsGalleryExpanded(false); // Toggle gallery expansion
      setIsExpanded(false); // Toggle image expansion
    } else {
      setIsExpanded(true); // Expand the image
      console.log('is expanded true')
    }
  };

  const handleMouseMove = (e) => {
    if (isGalleryExpanded) {
      const imageContainer = document.querySelector('.p-o-main-image');
      const rect = imageContainer.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      // console.log(mouseY)
      const percentageY = (mouseY / rect.height) * 100;
      setBackgroundPositionY(`${percentageY}%`);
    }
  };

  const handleClick = () => {
    if (isGalleryExpanded) {
      handleImageClick(); // If expanded, toggle image size
    } else {
      toggleGallery(); // If not expanded, toggle gallery
    }
  };


  return (
    <>
      {/* Main Image */}
      <span
      className="p-o-main-image"
        alt={selectedStyle.name}
        style={{
          backgroundImage: `url(${selectedStyle.photos[currentImageIndex]?.url || noImageAvailable})`,
          width: isGalleryExpanded ? '100%' : '63%',
          // cursor: isGalleryExpanded ? 'zoom-in' : 'pointer',
          // backgroundSize: isGalleryExpanded ? 'contain' : 'cover',
          backgroundSize: isGalleryExpanded ? 'cover' : (isExpanded ? 'cover' : 'cover'),
          backgroundPositionY: backgroundPositionY,
          transition: 'all 0.5s ease',
        }}
      ></span>
       {/* Arrow Buttons */}
       <span className="p-o-arrows-conteiner-default-image-view"
               style={{
                width: isGalleryExpanded ? '100%' : '63%',
                paddingLeft: isGalleryExpanded ? '20px' : '96px',
                cursor: isGalleryExpanded ? 'move' : 'zoom-in',
                transition: 'all 0.5s ease',
              }}
              onClick={handleClick}
        onMouseMove={handleMouseMove}
       >
      <FaCircleArrowLeft
      style={{cursor:'pointer',
      opacity: currentImageIndex === 0 ? '0' : '1',
      }}
      className={isGalleryExpanded ? 'p-o-arrows-expanded-view' : 'p-o-arrows'}
      onClick={(e) => { e.stopPropagation(); handleImageNavigation('prev'); }}/>

      <FaCircleArrowRight style={{cursor:'pointer',
      opacity: currentImageIndex === selectedStyle.photos.length - 1 ? '0' : '1',
    }}
      className={isGalleryExpanded ? 'p-o-arrows-expanded-view' : 'p-o-arrows'}
      onClick={(e) => { e.stopPropagation(); handleImageNavigation('next'); }} />
     </span>
                 {/* Thumbnail navigation Images */}
            <span className={isGalleryExpanded ? 'p-o-thumbnails-bottom-container' : 'p-o-thumbnails-left-container'}>
              {selectedStyle.photos.map((photo, index) => (
                <span
                  className={isGalleryExpanded ? 'p-o-thumbnail-bottom-expanded-view' : 'p-o-thumbnail-left'}
                  style={{ backgroundImage: `url(${photo.thumbnail_url})`,
                  border: currentImageIndex === index ? '2px solid #579dff' : ''}}
                  onClick={() => handleThumbnailClick(index)}
                  alt={`Thumbnail ${index}`}
                  key={index}
                >
                </span>
              ))}
            </span>
    <div className="image-gallery-container"
    style={{
    transition: 'all 0.5s ease',
    }}>
          </div>
          </>
  );
};

export default ImageGallery;
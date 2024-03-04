// client/components/ProductOverview/Styles.jsx
import React, { useEffect } from 'react';

const Styles = ({ styles, currentStyleId, setCurrentStyleId }) => {

  // Set default style upon component mounting
  useEffect(() => {
    if (styles && styles.length > 0 && !currentStyleId) {
      setCurrentStyleId(styles[0].style_id);
    }
  }, [styles, currentStyleId, setCurrentStyleId]);

  return (
    <div className="styles-container">
      {/* Map through styles and display thumbnails */}
      {styles.map((style, index) => (
        <div
          key={style.style_id}
          className={`style-thumbnail ${style.style_id === currentStyleId ? 'selected' : ''}`}
          onClick={() => setCurrentStyleId(style.style_id)}
          style={{ backgroundImage: `url(${style.photos[0].thumbnail_url})` }}
        >
          {/* Overlay checkmark if the style is selected */}
          {style.style_id === currentStyleId && (
            <div className="checkmark">&#10003;</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Styles;

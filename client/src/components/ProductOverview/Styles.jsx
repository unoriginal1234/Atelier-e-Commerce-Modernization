// import React from 'react';
// It's not necessary to import React in the styles.jsx file if we're not explicitly using any React features like JSX. Since the file only contains a functional component and JavaScript code, removing the import statement won't affect its functionality. JSX gets transpiled to regular JavaScript code during the build process, so as long as your build setup supports it, you can omit the import statement for React in files that don't directly use JSX. This can help reduce unnecessary imports and keep your code cleaner.
import { isValidURL } from './Utils';
import { FaCheck } from "react-icons/fa6";

const Styles = ({ styles, currentStyleId, handleStyleChange }) => {
  // console.log('Styles.jsx: currentStyleId:', currentStyleId)
  // console.log('Styles.jsx: stylesData.results.style_id:', styles.results)

  // function to set the ID of the selected style on thumbnail click
  const handleStyleClick = (styleId) => {
    if (styleId !== currentStyleId) {
      handleStyleChange(styleId);
    }
  };

  return (
    <div className="styles-container">
      {styles.map((style) => (
        <div
          key={style.style_id}
          /* add CSS overlay class to the current selected style */
          className={`style-thumbnail ${style.style_id === currentStyleId ? 'selected' : ''}`}
          onClick={() => handleStyleClick(style.style_id)}
          style={{  backgroundImage: `url(${isValidURL(style.photos[0].thumbnail_url) ? style.photos[0].thumbnail_url : 'https://placehold.co/600x400/EEE/31343C?font=oswald&text=NO+IMAGE'})` }}
          data-testid={`style-thumbnail-${style.style_id}`}
        >
          {/*  add checkmark to the current selected style */}
          {style.style_id === currentStyleId && (
            <div className="checkmark"><FaCheck /></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Styles;

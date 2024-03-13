// SloganDescFeat.js

const SloganDescFeat = ({ isDarkMode, productData }) => {
  return (
    <div className="slogan-description-and-features">
      <div className={`product slogan-description ${isDarkMode ? 'dark-mode-text' : ''}`}>
        <h4 className={`${isDarkMode ? 'dark-mode-text' : ''}`}>{productData.slogan}</h4>
        <p>{productData.description}</p>
        <span className="rounded-right-border"></span>
      </div>
      <div className={`product p-o-features ${isDarkMode ? 'dark-mode-text' : ''}`}>
        <ul>
          {productData.features && productData.features.map((product, i) => (
            <li key={`feature-${i}`}>
              <span><b className={`${isDarkMode ? 'dark-mode-text' : ''}`}>&#10003;</b></span>
              {product.feature} {product.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SloganDescFeat;


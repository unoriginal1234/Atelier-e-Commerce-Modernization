// SloganDescFeat.js

const SloganDescFeat = ({ productData }) => {
  return (
    <div className="slogan-description-and-features">
      <div className="product slogan-description">
        <h4>{productData.slogan}</h4>
        <p>{productData.description}</p>
        <span className="rounded-right-border"></span>
      </div>
      <div className="product p-o-features">
        <ul>
          {productData.features && productData.features.map((product, i) => (
            <li key={`feature-${i}`}>
              <span><b>&#10003;</b></span>
              {product.feature} {product.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SloganDescFeat;


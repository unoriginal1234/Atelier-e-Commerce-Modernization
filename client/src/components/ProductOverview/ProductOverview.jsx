//client/components/ProductOverview/ProductOverview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// {
//   "id": 65631,
//   "campus": "rfp",
//   "name": "Camo Onesie",
//   "slogan": "Blend in to your crowd",
//   "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//   "category": "Jackets",
//   "default_price": "140.00",
//   "created_at": "2022-03-29T15:08:08.445Z",
//   "updated_at": "2022-03-29T15:08:08.445Z",
//   "features": [
//       {
//           "feature": "Fabric",
//           "value": "Canvas"
//       },
//       {
//           "feature": "Buttons",
//           "value": "Brass"
//       }
//   ]
// }

const ProductOverview = () => {

  const getProductData = () => {
    const options = {
      headers: {
        'Authorization': `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`,
          //  'contentType': 'application/json',
          //  'type': 'GET'
      }
    };
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631 ', options).then (r => {
      // log and set Data
      setData(r.data);
      console.log(r.data);
    }).catch(e => {
      //
      console.log(e);
    });
  };

  const [data, setData] = useState([]);
  //use effect to get the data
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="product-overview">
      {/* Image Gallery */}
      <div className="image-gallery">
        <img className="main-image" src="https://via.placeholder.com/300x300" alt="Main Product" />
        <div className="thumbnails">
          <img src="https://via.placeholder.com/50" alt="Thumbnail 1" />
          <img src="https://via.placeholder.com/50" alt="Thumbnail 2" />
          <img src="https://via.placeholder.com/50" alt="Thumbnail 3" />
        </div>
      </div>

      {/* Product Information */}
      <div className="product-info">
        <div className="rating">
          <img src="https://via.placeholder.com/20" alt="Star" />
          <img src="https://via.placeholder.com/20" alt="Star" />
          <img src="https://via.placeholder.com/20" alt="Star" />
          <img src="https://via.placeholder.com/20" alt="Star" />
          <img src="https://via.placeholder.com/20" alt="Star" />
          <a href="#">Read all reviews</a>
        </div>
        <div className="details">
          <p>Product Category</p>
          {/* <h2>Product Title</h2> */}
          <h2>{data.name}</h2>
          <p>$99.99</p>
          <p>Product Overview Text</p>
        </div>
        <div className="social-media">
          <button>Share on Facebook</button>
          <button>Share on Twitter</button>
        </div>
      </div>

      {/* Style Selector */}
      <div className="style-selector">
        <div className="style-thumbnails">
          <img src="https://via.placeholder.com/50" alt="Style Thumbnail 1" />
          <img src="https://via.placeholder.com/50" alt="Style Thumbnail 2" />
          <img src="https://via.placeholder.com/50" alt="Style Thumbnail 3" />
        </div>
      </div>

      {/* Add to Cart Form */}
      <div className="add-to-cart">
        <label htmlFor="size">Size:</label>
        <select name="size" id="size">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" max="10" />
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductOverview;
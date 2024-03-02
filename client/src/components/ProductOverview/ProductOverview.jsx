//client/components/ProductOverview/ProductOverview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// when the page first loads we want to show a cool product to make our demo more appealing
// and also flex on the other teams
// therefore, we can have a default id on App.js --> const [productID, setProductID] = useState(65631);
// then, we can change the productID whenever clicking on a link that changes the productID

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

const ProductOverview = ({id}) => {

const [data, setData] = useState(null);
const [stylesData, setStylesData] = useState(null);

const fetchData = (endpoint, setData) => {
  const options = {
    headers: {
      'Authorization': `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`,
      //  'contentType': 'application/json',
      //  'type': 'GET'
    }
  };
  axios.get(endpoint, options)
    .then(response => {
      setData(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

// useEffect to fetch the data
useEffect(() => {
  fetchData(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, setData);
  fetchData(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, setStylesData);
}, [id]);


if (!data || !stylesData) {
  return <div>Loading...</div>;
}

const stylesArray = stylesData.results.map(style => {
console.log(style);
});


//single photo
//console.log('stylesData.results: ', stylesData.results[0].photos[0].url);

return (
  <div className="product-overview">
    {stylesData.results.map(style => (
      <div key={style.style_id} className="product-style">
        <h2>{style.name}</h2>
        <div className="price">
          {style.sale_price ? (
            <>
              <span className="original-price">${style.original_price}</span>
              <span className="sale-price">${style.sale_price}</span>
            </>
          ) : (
            <span>${style.original_price}</span>
          )}
        </div>
        <div className="photos">
          {style.photos.map(photo => (
            <img key={photo.url} src={photo.thumbnail_url} alt={style.name} />
          ))}
        </div>
        <div className="sizes">
          Available Sizes:
          <ul>
            {Object.values(style.skus).map(sku => (
              <li key={sku.size}>
                {sku.size} - {sku.quantity} in stock
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);


  // return (
  //   <div className="product-overview">
  //     {/* Image Gallery */}
  //     <div className="image-gallery">
  //       <img className="main-image" src={stylesData.results[0].photos[0].url} alt="Main Product" />
  //       <div className="thumbnails">
  //         <img src="https://via.placeholder.com/50" alt="Thumbnail 1" />
  //         <img src="https://via.placeholder.com/50" alt="Thumbnail 2" />
  //         <img src="https://via.placeholder.com/50" alt="Thumbnail 3" />
  //       </div>
  //     </div>

  //     {/* Product Information */}
  //     <div className="product-info">
  //       <div className="rating">
  //         {/* <img src={stylesData[]} alt="Star" /> */}
  //         <img src="https://via.placeholder.com/20" alt="Star" />
  //         <img src="https://via.placeholder.com/20" alt="Star" />
  //         <img src="https://via.placeholder.com/20" alt="Star" />
  //         <img src="https://via.placeholder.com/20" alt="Star" />
  //         <a href="#">Read all reviews</a>
  //       </div>
  //       <div className="details">
  //         <p>CATEGORY -> {data.category}</p>
  //         {/* <h2>Product Title</h2> */}
  //         <h2>{data.name}</h2>
  //         {/* <p>PRICE: $99.99</p> */}
  //         <p>{data.default_price}</p>
  //         <p>Product Overview Text</p>
  //       </div>
  //       <div className="social-media">
  //         <button>Share on Facebook</button>
  //         <button>Share on Twitter</button>
  //       </div>
  //     </div>

  //     {/* Style Selector */}
  //     <div className="style-selector">
  //       <div className="style-thumbnails">
  //         <img src="https://via.placeholder.com/50" alt="Style Thumbnail 1" />
  //         <img src="https://via.placeholder.com/50" alt="Style Thumbnail 2" />
  //         <img src="https://via.placeholder.com/50" alt="Style Thumbnail 3" />
  //       </div>
  //     </div>

  //     {/* Add to Cart Form */}
  //     <div className="add-to-cart">
  //       <label htmlFor="size">Size:</label>
  //       <select name="size" id="size">
  //         <option value="small">Small</option>
  //         <option value="medium">Medium</option>
  //         <option value="large">Large</option>
  //       </select>
  //       <label htmlFor="quantity">Quantity:</label>
  //       <input type="number" id="quantity" name="quantity" min="1" max="10" />
  //       <button>Add to Cart</button>
  //     </div>
  //   </div>
  // );
};

export default ProductOverview;
import axios from 'axios';

const fetchData = (id, authKey, setProductData, setStylesData, setReviewsData, setCurrentStyleId, setSelectedStyle, setavailableQuantities, setCurrentSKUs) => {
  // Fetching all data using Promise.all
  return Promise.all([
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, authKey),
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, authKey),
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${id}`, authKey),
    // axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart?session_id=${id}`, authKey)
  ])
    .then(([productResponse, stylesResponse, reviewsResponse]) => {
      // Setting fetched data to state variables
      setProductData(productResponse.data);
      setStylesData(stylesResponse.data);
      setReviewsData(reviewsResponse.data);
      // Setting default style if styles are available
      if (stylesResponse.data.results.length > 0) {
        const defaultStyleId = stylesResponse.data.results[0].style_id; // get the first style_id
        setCurrentStyleId(defaultStyleId); // set currentStyleId to pass it to the Styles component
        // set selectedStyle default data (the first item) -> {style_id: 404874, name: 'For...} to pass it to the ProductInformation component
        setSelectedStyle(stylesResponse.data.results[0]);
        // set the default sizes (first item) when page first loads
        // setAvailableSizes(Object.values(stylesResponse.data.results[0].skus).map(sku => sku.size));
        // set the default quantity (first item) when page first loads
        const quantities = Object.values(stylesResponse.data.results[0].skus).map(sku => sku.quantity);
        const totalQuantity = quantities.length > 0 ? Math.min(...quantities) : 0;
        setavailableQuantities(totalQuantity);
        // set current skus array
        setCurrentSKUs(
          Object.entries(stylesResponse.data.results[0].skus).map(sku => {
            return sku;
          }));
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

export default fetchData;

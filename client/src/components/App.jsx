//client/components/App.js
import React from 'react';

import ProductOverview from './ProductOverview/ProductOverview.jsx';

const App = () => {
  return(
    <div className="main-container">
      <h2>Logo</h2>
      <div className="widget-container"><ProductOverview /></div>
      <div className="widget-container">your Related Items module here</div>
      <div className="widget-container">your Rating and Reviews module here</div>
      <div className="widget-container">your Questions and Answers module here</div>
    </div>
  );
};

export default App;
 const featureMaker = function (pageData, item) {

    if (pageData !== undefined && pageData !== null) {
      if (Object.keys(pageData).length !== 0) {
        let pageCategoriesObj = JSON.parse(JSON.stringify(pageData));
        let newFeatures = item.product.features;
        pageCategoriesObj['Product Name'].v2 = item.product.name;
        for (var i = 0; i < newFeatures.length; i ++) {
          if (pageCategoriesObj[newFeatures[i].feature] !== undefined) {
            pageCategoriesObj[newFeatures[i].feature].v2 = newFeatures[i].value;
          } else {
            pageCategoriesObj[newFeatures[i].feature] = {v2: newFeatures[i].value || 'N/A'}
          }
        }
        return pageCategoriesObj;
      }
    } else {
      return {};
    }
  }

  export default featureMaker;
const setRating = function(preStarRatings) {
  let reviewNumber = 0;
  let reviewWeight = 0;
  for (var key in preStarRatings) {
    reviewNumber += Number(preStarRatings[key]);
    reviewWeight += (preStarRatings[key] * key);
  }
  return reviewWeight / reviewNumber;
}

 export default setRating;
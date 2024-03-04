export var product = [
  {
    "id": 1,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140"
  },
  {
    "id": 2,
    "name": "Bright Future Sunglasses",
    "slogan": "You've got to wear shades",
    "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    "category": "Accessories",
    "default_price": "69"
  },
  {
    "id": 3,
    "name": "Morning Joggers",
    "slogan": "Make yourself a morning person",
    "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
    "category": "Pants",
    "default_price": "40"
  }
  // Add more products here as needed
];

export var reviewsMets = {
  "product_id": "2",
  "ratings": {
    "2": 1,
    "3": 1,
    "4": 2,
    // ...
  },
  "recommended": {
    "0": 5
    // ...
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    }
    // Add more characteristics here as needed
  }
};

export var reviews = {
  "product_id": "2",
  "ratings": {
    "2": 1,
    "3": 1,
    "4": 2
    // Add more ratings as needed
  },
  "recommended": {
    "0": 5
    // Add more recommendations as needed
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    }
    // Add more characteristics as needed
  },
  "results": [
    {
      "review_id": 1,
      "rating": 5,
      "summary": "Amazing product!",
      "recommend": true,
      "response": null,
      "body": "I absolutely love this product. It exceeded my expectations!",
      "date": "2023-07-12T00:00:00.000Z",
      "reviewer_name": "happyshopper123",
      "helpfulness": 8,
      "photos": [
        {
          "id": 1,
          "url": "https://source.unsplash.com/random/800x600/?product"
        },
        {
          "id": 2,
          "url": "https://source.unsplash.com/random/800x600/?product"
        }
        // Add more photos as needed
      ]
    },
    {
      "review_id": 2,
      "rating": 4,
      "summary": "Good value for money",
      "recommend": true,
      "response": null,
      "body": "This product offers good value for money. I'm satisfied with my purchase.",
      "date": "2023-08-05T00:00:00.000Z",
      "reviewer_name": "budgetshopper456",
      "helpfulness": 6,
      "photos": []
    }
    // Add more reviews as needed
  ]
};


export var styles = {
  "product_id": "1",
  "results": [
    {
      "style_id": 1,
      "name": "Forest Green & Black",
      "original_price": "140",
      "sale_price": "0",
      "default": true,
      "photos": [
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?forest",
          "url": "https://source.unsplash.com/random/800x600/?forest"
        },
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?cars",
          "url": "https://source.unsplash.com/random/800x600/?cars"
        },
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?fitness",
          "url": "https://source.unsplash.com/random/800x600/?fitness"
        },
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?model",
          "url": "https://source.unsplash.com/random/800x600/?model"
        }
      ],
      "skus": {
        "37": {
          "quantity": 8,
          "size": "XS"
        },
        "38": {
          "quantity": 16,
          "size": "S"
        },
        "39": {
          "quantity": 17,
          "size": "M"
        }
      }
    },
    {
      "style_id": 2,
      "name": "Desert Brown & Tan",
      "original_price": "140",
      "sale_price": "0",
      "default": false,
      "photos": [
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?desert",
          "url": "https://source.unsplash.com/random/800x600/?desert"
        },
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?fitness",
          "url": "https://source.unsplash.com/random/800x600/?fitness"
        },
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?model",
          "url": "https://source.unsplash.com/random/800x600/?model"
        },
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?fitness",
          "url": "https://source.unsplash.com/random/800x600/?fitness"
        },
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?model",
          "url": "https://source.unsplash.com/random/800x600/?model"
        }
      ],
      "skus": {
        "37": {
          "quantity": 8,
          "size": "XS"
        },
        "38": {
          "quantity": 16,
          "size": "S"
        },
        "39": {
          "quantity": 17,
          "size": "M"
        }
      }
    },
    // Add more styles here as needed
    {
      "style_id": 3,
      "name": "Ocean Blue",
      "original_price": "120",
      "sale_price": "90",
      "default": false,
      "photos": [
        {
          "thumbnail_url": "https://source.unsplash.com/random/800x600/?ocean",
          "url": "https://source.unsplash.com/random/800x600/?ocean"
        }
      ],
      "skus": {
        "37": {
          "quantity": 10,
          "size": "XS"
        },
        "38": {
          "quantity": 20,
          "size": "S"
        },
        "39": {
          "quantity": 15,
          "size": "M"
        }
      }
    }
    // Add more styles as needed
  ]
};

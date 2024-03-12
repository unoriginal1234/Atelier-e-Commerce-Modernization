This project has been created using **webpack-cli**

# Kentuckyfried Callback - Front End Capstone

## Overview
A mockup of an e-commerce site using sample API data. This site is a fully-functional frontend built in React.

## Description
This site chains a series of API calls to an external database of products, images, related items, with additional queries and metadata about those products. It is broken into four main sections.

* Product Overview
* Related Items
* Ratings and Reviews
* Questions and Answers

The **Product Overview** section is the crown jewel of the site. It provides a larger main image based on the currently selected product and style. A series of thumbnails along the main image allows the user to easily browse individual images, and an additional thumbnail of styles are rendered as circular options to the right. The Product Overview allows the user to breezily peruse the currently selected item, discovering sales and commercial grade photographs, and utilizes React's transitions to give the user a tactile and enjoyable interface.

Additionally, users can select from various sizes and add their choices to a cart for checkout! Clicking on the main image enlarges it and offers the user the opportunity to explore it in more detail.

The **Related Items** component is a carosel of products in the vendor's catalogue that share qualities of the currently selected product. Using a series of API calls to additional products, main images of the related products are rendered on individual cards. As the user mouses over the card, thumbnails of the various styles appear below, allowing the user to browse related items beore fully committing to leaving the page.

Upon clicking a star icon on each card, the user is gifted a small index of related comparable qualities to the currently selected item. Additionally, the user can add items to their "outfit", allowing the customer the convenience of comparing styles and products together before making the perfect purchases.

The **Ratings and Reviews** section allows a user the convenience of seeing the real live experiences of customers before committing to any purchase. A sidebar of product data displays the overall user rating of the item, meters of total reviews, and metrics of characteristics which can be clicked in order to filter reviews. Each review includes a customer name, date, the summary, rating and review. Users can report or indicate if the review was helpful as well as sort the reviews by Relevance, Helpfulness or Newness.

The **Questions and Answers** section gives the opportunity to see user-submitted queries and responses about the currrently selected product. This component is a series of a cards with the ability to reply to each question, submit a user question or indicate the helpfulness of each question or answer. Additionally, users may upload photographs, which when clicked, open enlarge in a modular space for the user to see more detail.

Installation - How can another developer get your project up and running on their own? What dependencies are required? Are there environmental requirements? Be specific, and outline steps to take in order to get the project running.

## Dependencies
* npm
* ES6 on both server side and client
* Transpile with babel via webpack
* Asset compilation and loading: webpack and webpack-dev
* React for client-side
* Axios for API calls (Github API key needed for Authorization, added to .env in the root directory)
* React icons and styled-components
* Testing frameworks: Jest, react testing library
* Deployment containers: AWS
```
npm run build
```
or
```
yarn build
```
to bundle your application

/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen, getByLabelText, getByTitle, waitFor, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import RatingsAndReviews from './RatingsAndReviews.jsx'
import ReviewBreakdown from './ReviewBreakdown.jsx'
import ProductBreakdown from './ProductBreakdown.jsx'
import SeeMore from './SeeMore.jsx'
import ReviewsCard from './ReviewsCard.jsx'
// jest.mock('axios')
// import axios from 'axios'

const reviewsMeta = {
  "characteristics" :
  {"Comfort" : {id: 220232, value: '3.7853403141361257'},
  "Fit" : {id: 220230, value: '3.3874345549738220'},
  "Length" : {id: 220231, value: '3.5654450261780105'},
  "Quality" : {id: 220233, value: '3.6858638743455497'}},
  "ratings": {'5': 1, '4': 1, '3': 1, '2': 1, '1': 1},
  "recommended": {"true": 1, "false": 1}
  }

const filterHandler = () => {console.log('click')}

test('renders title', () => {
  const {asFragment, getByText} = render(<RatingsAndReviews />)
  expect(getByText('Ratings and Reviews')).toBeInTheDocument()
})

test('renders title', () => {
  const container = render(<RatingsAndReviews id={1}/>)
    waitFor(() => {
      expect((container.firstChild).toHaveClass('rr-container'))
    })
    waitFor(() => {
      expect((container.firstChild.firstChild).toHaveClass('rr-container'))
    })
})


test('renders recommended', () => {
  const {asFragment, getByText} = render(<ReviewBreakdown reviewsMeta={reviewsMeta} filterHandler={filterHandler}/>)
  waitFor(() => {
    expect(getByText('reviews recommend this product')).toBeInTheDocument()
  })
})

test('renders recommended', () => {
  const {asFragment, getByText} = render(<ReviewBreakdown reviewsMeta={reviewsMeta} filterHandler={filterHandler}/>)
  waitFor(() => {
    expect(getByText('5 stars')).toBeInTheDocument()
  })
  waitFor(() => {
    expect(getByText('4 stars')).toBeInTheDocument()
  })
  waitFor(() => {
    expect(getByText('3 stars')).toBeInTheDocument()
  })
  waitFor(() => {
    expect(getByText('2 stars')).toBeInTheDocument()
  })
  waitFor(() => {
    expect(getByText('1 star')).toBeInTheDocument()
  })
})

test('Renders with a className equal to the variant', () => {
  const container = render(<ReviewBreakdown reviewsMeta={reviewsMeta} filterHandler={filterHandler}/>)
    waitFor(() => {
      expect((container.firstChild).toHaveClass('rr-breakdown'))
    })
    waitFor(() => {
      expect((container.firstChild.firstChild).toHaveClass('rr-star-and-breakdown-container'))
    })
})


test('Numbers bold when clicked', () => {

  const mockSet = jest.fn();

    render(<ReviewBreakdown reviewsMeta={reviewsMeta} filterHandler={filterHandler}/>);
    const starFive = screen.getByText('5 stars')
    const starFour = screen.getByText('4 stars')
    const starThree = screen.getByText('3 stars')
    const starTwo = screen.getByText('2 stars')
    const starOne = screen.getByText('1 star')


    fireEvent.click(starFive)
    fireEvent.click(starFour)
    fireEvent.click(starThree)
    fireEvent.click(starTwo)
    fireEvent.click(starOne)

    // expect(mockSet.mock.calls).toHaveLength(1)
    expect(starFive).toHaveStyle({'fontWeight':"bold"})
    expect(starFour).toHaveStyle({'fontWeight':"bold"})
    expect(starThree).toHaveStyle({'fontWeight':"bold"})
    expect(starTwo).toHaveStyle({'fontWeight':"bold"})
    expect(starOne).toHaveStyle({'fontWeight':"bold"})

    fireEvent.click(starFive)
    expect(starFive).toHaveStyle({'fontWeight':"normal"})
})

describe('characteristics dynmaically render', ()=> {
  test('renders characteristics', ()=> {

    const reviewsMeta =
    {"characteristics" :
    {"Comfort" : {id: 220232, value: '3.7853403141361257'},
    "Fit" : {id: 220230, value: '3.3874345549738220'},
    "Length" : {id: 220231, value: '3.5654450261780105'},
    "Quality" : {id: 220233, value: '3.6858638743455497'}}}

    render(<ProductBreakdown reviewsMeta={reviewsMeta}/>)
    waitFor(()=>{
      expect(screen.getByLabelText('Size')).toBeInTheDocument();
    })
  })
})

describe('See more button', ()=> {
  const fetchMore = () => console.log('click');
  test('See more button exists', ()=> {

    waitFor(()=>{
      expect(screen.getByLabelText('See More...')).toBeInTheDocument();
    })
    const container = render(<SeeMore fetchMore={fetchMore}/>)

    waitFor(() => {
      expect((container.firstChild).toHaveClass('rr-see-more-btn'))
    })
  })
  test('clicking the button', () => {

    const mockSet = jest.fn();
    const alertMock = jest.spyOn(window,'alert').mockImplementation();


    render(<SeeMore fetchMore={mockSet}/>);
    const button = screen.getByRole('button')

    fireEvent.click(button)
    // Here you'd want to test if `<FiMinusCircle />` is rendered.
    expect(mockSet.mock.calls).toHaveLength(1)
  })
})

describe('Reviews Card tests', ()=> {

  const review =  {
    "body" : "This is definitely a cat. That is all. Hope FEC has been going fine for you all",
    "date" : "2022-04-14T00:00:00.000Z",
    "helpfulness" : 6,
    "photos" : [],
    "rating" : 5,
    "recommend" : true,
    "response" : null,
    "review_id" : 1176361,
    "reviewer_name" : "cat",
    "summary" : "Is this a cat?"}
  test('Text Renders', ()=> {
    render(<ReviewsCard review={review}/>)
    waitFor(()=>{
      expect(screen.getByLabelText('Helpful?')).toBeInTheDocument();
      expect(screen.getByLabelText('Report?')).toBeInTheDocument();
    })
  })
  test('Report click', ()=>{
    const mockSet = jest.fn();
    render(<ReviewsCard review={review}/>)
    const report = screen.getByText('Report?')
    fireEvent.click(report)
    waitFor(()=>{
      expect(screen.getByText('Reported')).toBeInTheDocument();
    })
  })
  test('Help click', ()=>{
    const mockSet = jest.fn();
    render(<ReviewsCard review={review}/>)
    const helpful = screen.getByText('Helpful?')
    fireEvent.click(helpful)
    waitFor(()=>{
      expect(screen.getByText('Yes')).toBeInTheDocument();
      //expect(screen.getByText('7')).toBeInTheDocument();
    })
  })
})


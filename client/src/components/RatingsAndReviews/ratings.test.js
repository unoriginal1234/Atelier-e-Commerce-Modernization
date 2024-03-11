/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen, getByLabelText, getByTitle, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import RatingsAndReviews from './RatingsAndReviews.jsx'
import ReviewBreakdown from './ReviewBreakdown.jsx'

const reviewsMeta = 'mockReviewsMeta'
const filterHandler = 'mockFilterHandler'

test('renders title', () => {
  const {asFragment, getByText} = render(<RatingsAndReviews />)
  expect(getByText('Ratings and Reviews')).toBeInTheDocument()
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
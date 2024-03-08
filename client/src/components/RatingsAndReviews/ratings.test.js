/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import RatingsAndReviews from './RatingsAndReviews.jsx'
import ReviewBreakdown from './ReviewBreakdown.jsx'

test('renders title', () => {
  const {asFragment, getByText} = render(<RatingsAndReviews />)
  expect(getByText('Ratings and Reviews')).toBeInTheDocument()
})

test('renders subtitle', () => {
  const {asFragment, getByText} = render(<RatingsAndReviews />)
  expect(getByText('Rating Breakdown')).toBeInTheDocument()
})
/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import RatingsAndReviews from './RatingsAndReviews.jsx'

test('renders title', () => {
  const {asFragment, getByText} = render(<RatingsAndReviews />)
  expect(getByText('Ratings and Reviews')).toBeInTheDocument()
})


/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../components/App.jsx'

test('renders a message', () => {
  const {asFragment, getByText} = render(<App />)
  expect(getByText('KFC Logo')).toBeInTheDocument()
})

// test('renders a message', () => {
//   const {asFragment, getByText} = render(<App />)
//   expect(getByText('pizza')).toBeInTheDocument()
// })
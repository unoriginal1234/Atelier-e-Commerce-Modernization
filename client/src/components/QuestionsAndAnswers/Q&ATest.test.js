/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import SearchAnswers from './SearchAnswers.jsx';
import QuestionItem from './QuestionItem';
import AnswerModalContent from './AnswerModalContent.jsx';
test('renders a message', () => {
  const {asFragment, getByText} = render(<QuestionsAndAnswers />)
  expect(getByText('Loading...')).toBeInTheDocument()
})
test('renders a placeholder', () => {
  const {asFragment, getByPlaceholderText} = render(<SearchAnswers />)
  expect(getByPlaceholderText('Have a question? Search for answers…')).toBeInTheDocument()
})
test('renders a placeholder', () => {
  const {asFragment, getByPlaceholderText} = render(<AnswerModalContent />)
  expect(getByPlaceholderText('Example: jack@email.com')).toBeInTheDocument()
})

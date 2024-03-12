/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, getByLabelText, getByTitle, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewReviewForm from './NewReviewForm.jsx'

const characteristics = {'Size': 1, 'Width': 1, 'Comfort': 1, 'Quality': 1, 'Length': 1, 'Fit': 1}
const id = 'mockID'
const mockReview = () => {console.log('click')}

test('renders title', () => {
  const {asFragment, getByText} = render(<NewReviewForm characteristics={characteristics} id={id}/>)
  expect(getByText('Write Your Review')).toBeInTheDocument()
})

describe('characteristics dynmaically render', ()=> {
  test('renders characteristics', ()=> {
    render(<NewReviewForm characteristics={characteristics} id={id}/>)
    waitFor(()=>{
      expect(screen.getByLabelText('Size')).toBeInTheDocument();
      expect(screen.getByLabelText('Width')).toBeInTheDocument();
      expect(screen.getByLabelText('Comfort')).toBeInTheDocument();
      expect(screen.getByLabelText('Quality')).toBeInTheDocument();
      expect(screen.getByLabelText('Length')).toBeInTheDocument();
      expect(screen.getByLabelText('Fit')).toBeInTheDocument();
      expect(screen.getByLabelText('What is you nickname')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Do you Recommend')).toBeInTheDocument();
      expect(screen.getByLabelText('Summary')).toBeInTheDocument();
      expect(screen.getByLabelText('Review:')).toBeInTheDocument();
    })
  })
})

test('should find form elements by label', () => {

  const onChangeSpy = jest.fn();

  const { getByLabelText, rerender } = render(<NewReviewForm characteristics={characteristics} id={id} submitReview={mockReview}/>);
  waitFor(()=>{
    expect(screen.getByLabelText('Uncomfortable:')).toBeInTheDocument();
  })

});

test('Renders with a className equal to the variant', () => {
  const container = render(<NewReviewForm characteristics={characteristics} id={id}/>)
    waitFor(() => {
      expect((container.firstChild).toHaveClass('rr-modal-content'))
    })
    waitFor(() => {
      expect((container.firstChild.firstChild).toHaveClass('rr-form-topper'))
    })
    waitFor(() => {
      expect((container.firstChild.firstChild.firstChild).toHaveClass('rr-form-exit'))
    })
    waitFor(() => {
      expect((container.firstChild.firstChild.firstChild.firstChild).toHaveClass('rr-form-stars'))
    })
    waitFor(() => {
      expect((container.firstChild.firstChild.firstChild.firstChild.firstChild).toHaveClass('rr-star'))
    })
    waitFor(() => {
      expect((container.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild).toHaveClass('rr-form-person'))
    })
})


test('Form button clicks', () => {
  const alertMock = jest.spyOn(window,'alert').mockImplementation();

  const mockSet = jest.fn();

    render(<NewReviewForm characteristics={characteristics} id={id} submitReview={mockSet}/>);
    const button = document.getElementById('form-submit')

    fireEvent.click(button)
    expect(alertMock).toHaveBeenCalledTimes(1)
})

test('adds input to summary', () => {
  const alertMock = jest.spyOn(window,'alert').mockImplementation();

  const mockSet = jest.fn();
  render(<NewReviewForm characteristics={characteristics} id={id} submitReview={mockSet}/>);

  const input = document.getElementById('rr-summary-review-body')
  fireEvent.change(input, {target: {value: 'When the jumbly little junk monster ran around eating a bunch of chicken I was most enthralled by the noodles and the fancy little dancer I am happy for the baby, so dont come at me '}})

  const button = document.getElementById('form-submit')

  fireEvent.click(button)
  expect(alertMock).toHaveBeenCalledTimes(2)
})

test('adds input to review', () => {
  const alertMock = jest.spyOn(window,'alert').mockImplementation();

  const mockSet = jest.fn();
  render(<NewReviewForm characteristics={characteristics} id={id} submitReview={mockSet}/>);

  const input = document.getElementById('rr-form-review-body')
  fireEvent.change(input, {target: {value: 'When the jumbly little junk monster ran around eating a bunch of chicken I was most enthralled by the noodles and the fancy little dancer I am happy for the baby, so dont come at me '}})

  const button = document.getElementById('form-submit')

  fireEvent.click(button)
  expect(alertMock).toHaveBeenCalledTimes(3)
})

test('adds nickname', () => {
  const alertMock = jest.spyOn(window,'alert').mockImplementation();

  const mockSet = jest.fn();
  render(<NewReviewForm characteristics={characteristics} id={id} submitReview={mockSet}/>);

  const input = document.getElementById('nickname')
  fireEvent.change(input, {target: {value: 'Pete'}})

  const button = document.getElementById('form-submit')

  fireEvent.click(button)
  expect(alertMock).toHaveBeenCalledTimes(4)
})

test('adds nickname', () => {
  const alertMock = jest.spyOn(window,'alert').mockImplementation();

  const mockSet = jest.fn();
  render(<NewReviewForm characteristics={characteristics} id={id} submitReview={mockSet}/>);

  const input = document.getElementById('email')
  fireEvent.change(input, {target: {value: '123@123.com'}})

  const button = document.getElementById('form-submit')

  fireEvent.click(button)
  expect(alertMock).toHaveBeenCalledTimes(5)
})

test('adds nickname', () => {
  const alertMock = jest.spyOn(window,'alert').mockImplementation();

  const mockSet = jest.fn();
  render(<NewReviewForm characteristics={characteristics} id={id} submitReview={mockSet}/>);

  const input = document.getElementById('photo')
  fireEvent.change(input, {target: {value: 'pic.png'}})

  const button = document.getElementById('form-submit')

  fireEvent.click(button)
  expect(alertMock).toHaveBeenCalledTimes(6)
})

// test('clicks a radio button', () => {
//   const mockSet = jest.fn();
//   render(<NewReviewForm characteristics={characteristics} id={id} submitReview={mockSet}/>);

//   const labelRadio = screen.getByRole('size1', { value: 1 });


//   expect(labelRadio).not.toBeChecked();
//   fireEvent.click(labelRadio);
//   expect(labelRadio).toBeChecked();
// })

// test('adds input to rating', () => {
//   const alertMock = jest.spyOn(window,'alert').mockImplementation();

//   const mockSet = jest.fn();
//   render(<NewReviewForm characteristics={characteristics} id={id} submitReview={mockSet}/>);

//   const input = document.getElementById('star 2')
//   console.log(input)
//   fireEvent.click(input)

//   const button = document.getElementById('form-submit')

//   fireEvent.click(button)
//   expect(alertMock).toHaveBeenCalledTimes(3)
// })
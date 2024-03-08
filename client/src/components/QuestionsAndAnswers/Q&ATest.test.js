/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen, getByLabelText, getByTitle, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import SearchAnswers from './SearchAnswers.jsx';
import QuestionsList from './QuestionsList.jsx';
import QuestionItem from './QuestionItem';
import QuestionModalContent from './QuestionModalContent.jsx';
import AnswerModalContent from './AnswerModalContent.jsx';
import axios from 'axios';


describe('QuestionsAndAnswers', () => {
  test('renders loading state initially', () => {
    render(<QuestionsAndAnswers />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  test('renders "QUESTIONS & ANSWERS" text', () => {
    //mock props
    const id = 'mockId';
    const token = 'mockToken';
    const productData = 'mockProductData';
    render(
      <QuestionsAndAnswers id={id} token={token} productData={productData}/>
    )
    waitFor(() => {
      expect(screen.getByText('QUESTIONS & ANSWERS')).toBeInTheDocument();
    })
  })
  test('renders SearchAnswers component with handleSearch prop', () => {
    // Mock props
    const id = 'mockId';
    const token = 'mockToken';
    const productData = 'mockProductData';

    render(
      <QuestionsAndAnswers id={id} token={token} productData={productData} />
    );
    waitFor(()=> {
      expect(screen.getByLabelText('SearchAnswers')).toBeInTheDocument();
      expect(screen.getByLabelText('SearchAnswers')).toHaveAttribute('handleSearch');

    })
  });
  test('renders class names and placeholder text within SearchAnswers component', () => {
    // Mock props
    const handleSearch = "mock function"

    render(
      <SearchAnswers handleSearch={handleSearch} />
    );
    waitFor(()=> {
      expect(screen.getByTitle('search-container')).toBeInTheDocument();
      expect(screen.getByTitle('search-bar')).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Have a question? Search for answers…")).toBeInTheDocument();
    })
  });
  test('renders QuestionsList component with questionData, token, handleQuestionsList, productData, and id props', () => {
    // Mock props
    const id = 'mockId';
    const token = 'mockToken';
    const productData = 'mockProductData';

    render(
      <QuestionsAndAnswers id={id} token={token} productData={productData} />
    );
    waitFor(()=> {
      expect(screen.getByLabelText('QuestionsList')).toBeInTheDocument();
      expect(screen.getByLabelText('QuestionsList')).toHaveAttribute('questionData');
      expect(screen.getByLabelText('QuestionsList')).toHaveAttribute('token');
      expect(screen.getByLabelText('QuestionsList')).toHaveAttribute('handleQuestionsList');
      expect(screen.getByLabelText('QuestionsList')).toHaveAttribute('productData');
      expect(screen.getByLabelText('QuestionsList')).toHaveAttribute('id');
    })
  });
  test('renders class names, labels, and properly passes props into components within QuestionsList component', () => {
    // Mock props
    const questionData = ["mock array"];
    const token = "mock token";
    const handleQuestionsList = "mock handleQuestionsList";
    const productData = "mock productData";
    const id = "mock id";

    render(
      <QuestionsList questionData={questionData} token={token} handleQuestionsList={handleQuestionsList} productData={productData} id={id} />
    );
    waitFor(()=> {
      expect(screen.getByTitle('question-list-container')).toBeInTheDocument();
      expect(screen.getByLabelText('QuestionItem')).toHaveAttribute('key');
      expect(screen.getByLabelText('QuestionItem')).toHaveAttribute('questionData');
      expect(screen.getByLabelText('QuestionItem')).toHaveAttribute('question');
      expect(screen.getByLabelText('QuestionItem')).toHaveAttribute('token');
      expect(screen.getByLabelText('QuestionItem')).toHaveAttribute('handleQuestionsList');
      expect(screen.getByLabelText('QuestionItem')).toHaveAttribute('productData');
      expect(screen.getByLabelText('QuestionItem')).toHaveAttribute('product_id');
      expect(screen.getByTitle('bottom-buttons-container')).toBeInTheDocument();
      expect(screen.getByTitle('more-questions-button')).toBeInTheDocument();
      expect(screen.getByLabelText("More Answered Questions")).toBeInTheDocument();
      expect(screen.getByLabelText("Add a Question")).toBeInTheDocument();
      expect(screen.getByTitle('question-modal-container')).toBeInTheDocument();
      expect(screen.getByLabelText('QuestionModalContent')).toHaveAttribute('onClose');
      expect(screen.getByLabelText('QuestionModalContent')).toHaveAttribute('token');
      expect(screen.getByLabelText('QuestionModalContent')).toHaveAttribute('handleQuestionsList');
      expect(screen.getByLabelText('QuestionModalContent')).toHaveAttribute('productData');
    })
  });
  test('renders class names, labels, and properly passes props into components within QuestionItem component', () => {
    // Mock props
    const questionData = ["mock questionData array"];
    const question = "mock question";
    const token = "mock token";
    const handleQuestionsList = "mock handleQuestionsList";
    const productData = "mock productData";
    const product_id = "mock product_id";

    render(
      <QuestionItem questionData={questionData} question={question} token={token} handleQuestionsList={handleQuestionsList} productData={productData} product_id={product_id} />
    );
    waitFor(()=> {
      expect(screen.getByTitle('qa-container')).toBeInTheDocument();
      expect(screen.getByTitle('eachQ-container')).toBeInTheDocument();
      expect(screen.getByLabelText("Q:")).toBeInTheDocument();
      expect(screen.getByTitle('eachQ-rightSide-container')).toBeInTheDocument();
      expect(screen.getByLabelText("Helpful?")).toBeInTheDocument();
      expect(screen.getByTitle('yes-button answer-button')).toBeInTheDocument();
      expect(screen.getByLabelText("Yes")).toBeInTheDocument();
      expect(screen.getByTitle('answer-button')).toBeInTheDocument();
      expect(screen.getByLabelText("Add Answer")).toBeInTheDocument();
      expect(screen.getByTitle('answer-modal-container')).toBeInTheDocument();
      expect(screen.getByLabelText('AnswerModalContent')).toHaveAttribute('question');
      expect(screen.getByLabelText('AnswerModalContent')).toHaveAttribute('productData');
      expect(screen.getByLabelText('AnswerModalContent')).toHaveAttribute('onClose');
      expect(screen.getByLabelText('AnswerModalContent')).toHaveAttribute('token');
      expect(screen.getByLabelText('AnswerModalContent')).toHaveAttribute('answerID');
      expect(screen.getByLabelText('AnswerModalContent')).toHaveAttribute('handleQuestionsList');
      expect(screen.getByLabelText('AnswerList')).toHaveAttribute('question_id');
      expect(screen.getByLabelText('AnswerList')).toHaveAttribute('token');
      expect(screen.getByLabelText('AnswerList')).toHaveAttribute('forImageID');
      expect(screen.getByLabelText('AnswerList')).toHaveAttribute('product_id');
    })
  });
  test('renders class names, labels, and properly passes props into components within QuestionModalContent component', () => {
    // Mock props
    const onClose = "mock onClose function";
    const token = "mock token";
    const handleQuestionsList = "mock handleQuestionsList";
    const productData = "mock productData";

    render(
      <QuestionModalContent onClose={onClose} token={token} handleQuestionsList={handleQuestionsList} productData={productData}/>
    );
    waitFor(()=> {
      expect(screen.getByTitle('question-modal-content')).toBeInTheDocument();
      expect(screen.getByLabelText("Ask Your Question")).toBeInTheDocument();
      expect(screen.getByLabelText("About the ")).toBeInTheDocument();
      expect(screen.getByLabelText("YourQuestion:")).toBeInTheDocument();
      expect(screen.getByLabelText("What is your nickname: ")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Example: jackson11!")).toBeInTheDocument();
      expect(screen.getByLabelText("(For privacy reasons, do not use your full name or email address)")).toBeInTheDocument();
      expect(screen.getByLabelText("Your email:")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Why did you like the product or not?")).toBeInTheDocument();
      expect(screen.getByLabelText("(For authentication reasons,  you will not be emailed)")).toBeInTheDocument();
      expect(screen.getByLabelText("Submit")).toBeInTheDocument();
    })
  });
});



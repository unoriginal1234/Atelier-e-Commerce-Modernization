/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen, getByLabelText, getByTitle, waitFor, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import SearchAnswers from './SearchAnswers.jsx';
import QuestionsList from './QuestionsList.jsx';
import QuestionItem from './QuestionItem';
import QuestionModalContent from './QuestionModalContent.jsx';
import AnswerModalContent from './AnswerModalContent.jsx';
import AnswerList from './AnswerList.jsx';
import AnswerItem from './AnswerItem.jsx';
import AnswerImageItem from'./AnswerImageItem.jsx'
import AnswerImageModalContent from './AnswerImageModalContent.jsx';
import axios from 'axios';


describe('QuestionsAndAnswers', () => {
  test('renders loading state initially', () => {
    render(<QuestionsAndAnswers />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  test('renders "QUESTIONS & ANSWERS" text and handles API request', () => {
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
    // Mock handleSearch function
    const handleSearch = jest.fn();

    render(
      <SearchAnswers handleSearch={handleSearch} />
    );
    //get input element
    const inputElement = screen.getByPlaceholderText("Have a question? Search for answers…");
    //type into input
    fireEvent.change(inputElement, {target: {value: "test search"}});
    //verfiy handleSearch is called with updated search value
    expect(handleSearch).toHaveBeenCalledWith("test search")
    /*waitFor(()=> {
      expect(screen.getByTitle('search-container')).toBeInTheDocument();
      expect(screen.getByTitle('search-bar')).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Have a question? Search for answers…")).toBeInTheDocument();
    })*/
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
    const onClose = jest.fn();
    const token = "mock token";
    const handleQuestionsList = jest.fn();
    const productData = {id: 123, name: "mock product"};

    render(
      <QuestionModalContent onClose={onClose} token={token} handleQuestionsList={handleQuestionsList} productData={productData}/>
    );
    fireEvent.change(screen.getByLabelText("Your Question:"), { target: { value: 'Test Question' } });
    fireEvent.change(screen.getByLabelText("What is your nickname:"), { target: { value: 'Test Nickname' } });
    fireEvent.change(screen.getByLabelText("Your email:"), { target: { value: 'test@example.com' } });
    // Simulate form submission
    fireEvent.click(screen.getByText("Submit"));
    //expect(handleQuestionsList).toHaveBeenCalled();
    waitFor(()=> {
      expect(onClose).toHaveBeenCalled();
      expect(screen.getByTitle('question-modal-content')).toBeInTheDocument();
      expect(screen.getByLabelText("Ask Your Question")).toBeInTheDocument();
      expect(screen.getByLabelText("About the ")).toBeInTheDocument();
      //expect(screen.getByLabelText("Your Question:")).toBeInTheDocument();
      //expect(screen.getByLabelText("What is your nickname: ")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Example: jackson11!")).toBeInTheDocument();
      expect(screen.getByLabelText("(For privacy reasons, do not use your full name or email address)")).toBeInTheDocument();
      //expect(screen.getByLabelText("Your email:")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Why did you like the product or not?")).toBeInTheDocument();
      expect(screen.getByLabelText("(For authentication reasons,  you will not be emailed)")).toBeInTheDocument();
      expect(screen.getByLabelText("Submit")).toBeInTheDocument();
      expect(screen.getByText("You must enter the following:")).toBeInTheDocument();
    })
  });
  test('renders class names, labels, and properly passes props into components within AnswerModalContent component', () => {
    // Mock props
    const question = "mock question";
    const productData = "mock productData";
    const onClose = jest.fn();
    const token = "mock token";
    const answerID = "mock answerID";
    const handleQuestionsList = jest.fn();

    render(
      <AnswerModalContent question={question} productData={productData} onClose={onClose} token={token} answerID={answerID} handleQuestionsList={handleQuestionsList}/>
    );
    fireEvent.change(screen.getByLabelText("Your Answer:"), { target: { value: 'Test Answer' } });
    fireEvent.change(screen.getByLabelText("What is your nickname:"), { target: { value: 'Test Nickname' } });
    fireEvent.change(screen.getByLabelText("Your email:"), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText("Submit"));
    waitFor(()=> {
      expect(onClose).toHaveBeenCalled();
      expect(screen.getByTitle('answer-modal-content')).toBeInTheDocument();
      expect(screen.getByLabelText("Submit Your Answer")).toBeInTheDocument();
      expect(screen.getByLabelText(":")).toBeInTheDocument();
      //expect(screen.getByLabelText("Your Answer:")).toBeInTheDocument();
      expect(screen.getByLabelText("What is your nickname: ")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Example: jack543!")).toBeInTheDocument();
      expect(screen.getByLabelText("(For privacy reasons, do not use your full name or email address)")).toBeInTheDocument();
      expect(screen.getByLabelText("Your email:")).toBeInTheDocument();
      expect(screen.getByLabelText("(For authentication reasons,  you will not be emailed)")).toBeInTheDocument();
      expect(screen.getByLabelText("Submit")).toBeInTheDocument();

    })
  });
  test('renders class names, labels, and properly passes props into components within AnswerList component', () => {
    // Mock props
    const question_id = "mock question_id";
    const token = "mock token";
    const forImageID = "mock forImageID";
    const product_id = "mock product_id";

    render(
      <AnswerList question_id={question_id} token={token} forImageID={forImageID} product_id={product_id}/>
    );
    waitFor(()=> {
      expect(screen.getByTitle('answer-list-container')).toBeInTheDocument();
      expect(screen.getByLabelText('AnswerItem')).toHaveAttribute('key');
      expect(screen.getByLabelText('AnswerItem')).toHaveAttribute('answers');
      expect(screen.getByLabelText('AnswerItem')).toHaveAttribute('answer');
      expect(screen.getByLabelText('AnswerItem')).toHaveAttribute('handleAnswersList');
      expect(screen.getByLabelText('AnswerItem')).toHaveAttribute('token');
      expect(screen.getByLabelText('AnswerItem')).toHaveAttribute('forImageID');
      expect(screen.getByLabelText("Load More Answers")).toBeInTheDocument();

    })
  });
  test('renders class names, labels, and properly passes props into components within AnswerItem component', () => {
    // Mock props
    const mockDate = new Date('2024-03-11T12:00:00');
    const answers = "mock answers";
    const answer = {date:mockDate, photos:[]};
    const handleAnswersList = "mock handleAnswersList"
    const token = "mock token";
    const forImageID = jest.fn();

    render(
      <AnswerItem answers={answers} answer={answer} handleAnswersList={handleAnswersList} token={token} forImageID={forImageID}/>
    );
    waitFor(()=> {
      expect(screen.getByTitle('answer-container')).toBeInTheDocument();
      expect(screen.getByLabelText("A:")).toBeInTheDocument();
      expect(screen.getByTitle('answer-body-container')).toBeInTheDocument();
      expect(screen.getByTitle('answer-body-text')).toBeInTheDocument();
      expect(screen.getByTitle('answer-images-container')).toBeInTheDocument();
      expect(screen.getByLabelText('AnswerImageItem')).toHaveAttribute('key');
      expect(screen.getByLabelText('AnswerImageItem')).toHaveAttribute('answer');
      expect(screen.getByLabelText('AnswerImageItem')).toHaveAttribute('photo');
      expect(screen.getByLabelText('AnswerImageItem')).toHaveAttribute('token');
      expect(screen.getByLabelText('AnswerImageItem')).toHaveAttribute('handleAnswersList');
      expect(screen.getByTitle('answer-small-container')).toBeInTheDocument();
      expect(screen.getByLabelText("Helpful?")).toBeInTheDocument();
      expect(screen.getByTitle('yes-answer-button report-button')).toBeInTheDocument();
      expect(screen.getByTitle('report-button')).toBeInTheDocument();
      expect(screen.getByLabelText("Report")).toBeInTheDocument();
    })
  });
  test('renders class names, labels, and properly passes props into components within AnswerImageItem component', () => {
    // Mock props

    const photo = {url: "mock photo"}
    const token = "mock token";


    render(
      <AnswerImageItem photo={photo} token={token}/>
    );

    waitFor(()=> {
      expect(screen.getByTitle('answer-image')).toBeInTheDocument();
      userEvent.click(screen.getByAltText('answer-image'));
      expect(screen.getByTitle('answer-image-modal-container')).toBeInTheDocument();
      expect(screen.getByLabelText('AnswerImageModalContent')).toHaveAttribute('photo',photo.url);
      expect(screen.getByLabelText('AnswerImageModalContent')).toHaveAttribute('onClose');
      expect(screen.getByLabelText('AnswerImageModalContent')).toHaveAttribute('token', token);
    })
  });
  test('renders class names, labels, and properly passes props into components within AnswerImageModalContent component', () => {
    // Mock props

    const photo = {url: "mock photo"}
    const onClose = jest.fn();
    const token = "mock token";


    render(
      <AnswerImageModalContent photo={photo} token={token}/>
    );

    waitFor(()=> {
      expect(screen.getByTitle('answer-image-modal-content')).toBeInTheDocument();
      userEvent.click(screen.getByAltText('answer-image-onClose'));
      expect(screen.getByTitle('answer-image-modal-container')).toBeInTheDocument();
      expect(screen.getByTitle('answer-image-modal-settings')).toBeInTheDocument();

    })
  });
});



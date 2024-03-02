import React from 'react';

const QuestionItem = ({ question }) => {

  return (

    <div>
      <li>
        Q: {question.question_body}
      </li>

    </div>

  )

}

export default QuestionItem;
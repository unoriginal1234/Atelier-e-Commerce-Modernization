import { createPortal } from 'react-dom';
import React, {useState} from 'react';
import AnswerImageModalContent from './AnswerImageModalContent.jsx';
const AnswerImageItem = ({ photo, token }) => {
  const [showModal, setShowModal] = useState(false);

  return (

    <div>
      <img className="answer-image" src={photo.url} onClick={() => setShowModal(true)}/>
      {showModal && createPortal(
          <div className="answer-image-modal-container" onClick={()=> setShowModal(false)}>
              <AnswerImageModalContent photo={photo} onClose={()=> setShowModal(false)} />
          </div>
          , document.body)}
    </div>

  )
}

export default AnswerImageItem;
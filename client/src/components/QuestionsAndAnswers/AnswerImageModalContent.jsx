const AnswerImageModalContent = ({ photo , onClose}) => {

  return (
    <>
     <div className="answer-image-onClose" onClick={onClose}>X</div>
      <div className="answer-image-modal-content">
        <img className="answer-image-modal-settings" src={photo.url}/>
      </div>
    </>

  )

}
export default AnswerImageModalContent;
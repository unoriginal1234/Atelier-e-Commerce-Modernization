const AnswerImageModalContent = ({ photo , onClose}) => {

  return (
    <>
      <div className="answer-image-modal-content">
        <div className="answer-image-onClose" onClick={onClose}>X</div>
        <img className="answer-image-modal-settings" src={photo.url}/>
      </div>
    </>

  )

}
export default AnswerImageModalContent;
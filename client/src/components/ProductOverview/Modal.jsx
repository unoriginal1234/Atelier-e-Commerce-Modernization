import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { FaCheck } from "react-icons/fa";
import { BiError } from "react-icons/bi";

// Styled components for the modal and overlay
const ModalContainer = styled(animated.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  z-index: 1000;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer; /* Add pointer cursor */
`;

const H20 = styled.h2`
  margin: 10px;
`;

const Overlay = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: pointer; /* Add pointer cursor */
`;

// Modal component
const Modal = ({ size, title, text, closeAfter, autoClose, autoOpen, color, iconCenter, iconSize, iconColor }) => {
  const [visible, setVisible] = useState(autoOpen);

  useEffect(() => {
    let timer;
    if (autoClose) {
      timer = setTimeout(() => {
        setVisible(false);
      }, closeAfter * 1000);
    }

    return () => clearTimeout(timer);
  }, [autoClose, closeAfter]);

  const transitions = useTransition(visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const closeModal = () => {
    setVisible(false);
  };

  return transitions((style, item) =>
    item && (
      <Overlay style={style} onClick={closeModal}>
        <ModalContainer style={{ ...style, size, color }}>
          <H20>{title}</H20>
          {/* Your modal content here */}
          <FaCheck size={35} color="#40BB73" />
          <p>{text}</p>
        </ModalContainer>
      </Overlay>
    )
  );
};

export default Modal;

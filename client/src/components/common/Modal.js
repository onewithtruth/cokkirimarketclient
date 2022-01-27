import { useState } from 'react';
import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  font-family: Nanum Barun Gothic;
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  position: fixed;
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog'
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 300px;
  height: 120px;
  position: relative;
  display: flex;
  justify-content: center;

  > div.desc {
    margin-top: 25px;
    color: ${({ theme }) => theme.colors.blue_dark};
    font-size: 1.3rem;
  }
`;

export const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
    props.modalHandler(!isOpen);
    if (isOpen === false) props.setModalMsg('');
  };

  console.log(props.children[0]);

  return (
    <>
      <ModalContainer>
        {isOpen === true ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <div className='desc'>{props.children}</div>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};

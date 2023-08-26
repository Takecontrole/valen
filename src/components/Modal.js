import React from 'react';
import { LinkContainer } from "react-router-bootstrap";

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlaylay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
     >

        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <div className='modalcontent'>
            <h1>Присоединись к нам</h1>
            <p>и наслаждайся скидкой 2000р</p>
            <p>на первую покупку!</p>
          </div>
          <div className='btnContainer'>
            <button onClick={onClose} className='btnPrimary'>
              <span className='bold'>ОК</span>, получить купон
            </button>
            <button onClick={onClose} className='btnOutline'>
              <span className='bold'>НЕТ</span>, спасибо
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
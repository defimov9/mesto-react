import React from 'react';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? `popup_opened` : ''
      }`}>
      <div className='popup__container'>
        <h2 className='popup__title'>{props.title}</h2>
        <form className='popup__form' name={props.name} action='#' noValidate>
          {props.children}
          <button className='popup__submit' type='submit'>
            {props.buttonText}
          </button>
        </form>
        <button
          className='popup__close'
          type='button'
          onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;

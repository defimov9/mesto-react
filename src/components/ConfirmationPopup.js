import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmationPopup = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='delete-card'
      title='Вы уверены?'
      buttonText='Да'
    />
  );
};

export default ConfirmationPopup;

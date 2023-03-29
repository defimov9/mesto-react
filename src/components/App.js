import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({ ...selectedCard, name: card.name, link: card.link });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className='page'>
      <div className='container'>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name='edit-profile'
          title='Редактировать профиль'
          buttonText='Сохранить'
          children={
            <>
              <input
                type='text'
                name='name'
                id='userName'
                className='popup__input popup__input_type_name'
                placeholder='Имя'
                minLength='2'
                maxLength='40'
                required
              />
              <span className='popup__input-error userName-error'>-</span>
              <input
                type='text'
                name='job'
                id='userJob'
                className='popup__input popup__input_type_job'
                placeholder='Вид деятельности'
                minLength='2'
                maxLength='200'
                required
              />
              <span className='popup__input-error userJob-error'>-</span>
            </>
          }
        />
        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          name='add-photo'
          title='Новое место'
          buttonText='Сохранить'
          children={
            <>
              <input
                type='text'
                name='name'
                id='title'
                className='popup__input popup__input_type_title'
                placeholder='Название'
                minLength='2'
                maxLength='30'
                required
              />
              <span className='popup__input-error title-error'>-</span>
              <input
                type='url'
                name='link'
                id='link'
                className='popup__input popup__input_type_url'
                placeholder='Ссылка на картинку'
                required
              />
              <span className='popup__input-error link-error'>-</span>
            </>
          }
        />
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          name='update-avatar'
          title='Обновить аватар'
          buttonText='Сохранить'
          children={
            <>
              <input
                type='url'
                name='link'
                id='url'
                className='popup__input popup__input_type_url'
                placeholder='Ссылка на картинку'
                required
              />
              <span className='popup__input-error url-error'>-</span>
            </>
          }
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </div>
  );
}

export default App;

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.getUserData().then((userData) => setCurrentUser(userData));
  }, []);

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

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const toggleLike = isLiked
      ? api.deleteLike(card._id)
      : api.addLike(card._id);
    toggleLike
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userData) {
    api
      .updateUserInfo(userData)
      .then((updatedUserData) => {
        setCurrentUser({ ...currentUser, ...updatedUserData });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='container'>
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <PopupWithForm
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            name='add-photo'
            title='Новое место'
            buttonText='Сохранить'>
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
          </PopupWithForm>

          <PopupWithForm
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            name='update-avatar'
            title='Обновить аватар'
            buttonText='Сохранить'>
            <input
              type='url'
              name='link'
              id='url'
              className='popup__input popup__input_type_url'
              placeholder='Ссылка на картинку'
              required
            />
            <span className='popup__input-error url-error'>-</span>
          </PopupWithForm>

          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

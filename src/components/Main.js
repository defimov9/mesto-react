import React, { useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className='content'>
      <section className='profile content__profile'>
        <div className='profile__avatar-container'>
          <img
            src={userAvatar}
            alt='аватар'
            className='profile__avatar'
            onClick={props.onEditAvatar}
          />
        </div>
        <div className='profile__info'>
          <div className='profile__name-wrapper'>
            <h1 className='profile__name'>{userName}</h1>
            <button
              className='profile__edit-button'
              type='button'
              onClick={props.onEditProfile}
            />
          </div>
          <p className='profile__job'>{userDescription}</p>
        </div>
        <button
          className='profile__add-button'
          type='button'
          onClick={props.onAddPlace}
        />
      </section>
      <section className='gallery content__gallery'>
        <ul className='elements'>
          {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className='elements__card'>
      <img
        src={props.card.link}
        alt={props.card.name}
        className='elements__image'
        onClick={handleClick}
      />
      <div className='elements__remove'></div>
      <div className='elements__info-container'>
        <h2 className='elements__title'>{props.card.name}</h2>
        <div className='elements__like-container'>
          <button className='elements__like' type='button'></button>
          <p className='elements__likes-count'>{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

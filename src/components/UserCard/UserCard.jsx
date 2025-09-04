// Displays a single user's info and handles fallback avatar
import React, { useState } from 'react';
import './UserCard.scss';
import defaultPhoto from '../../assets/photo-cover.svg';

const UserCard = ({ user }) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };
  if (!user) return null;

  const imageSource = imgError ? defaultPhoto : (user.photo || user.avatar || defaultPhoto);

  return (
    <article className="user-card" aria-label={`User ${user.name}`}>
      <div className="user-card__avatar-wrap">
        <img 
          className="user-card__avatar" 
          src={imageSource}
          alt={user.name || 'User avatar'} 
          onError={handleImageError}
        />
      </div>
      <h3 className="user-card__name" title={user.name}>{user.name}</h3>
      <div className="user-card__meta">
        <div className="user-card__position">{user.position}</div>
        <div className="user-card__email">{user.email}</div>
        <div className="user-card__phone">{user.phone}</div>
      </div>
    </article>
  );
};

export default React.memo(UserCard);

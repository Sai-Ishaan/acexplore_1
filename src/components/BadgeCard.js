import React from 'react';

const BadgeCard = ({ badge }) => {
  return (
    <div className="badge-card">
      <img src={badge.imageUrl} alt={badge.name} className="badge-image" />
      <h3>{badge.name}</h3>
      <p>{badge.description}</p>
    </div>
  );
};

export default BadgeCard;

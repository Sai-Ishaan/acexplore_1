// components/BadgeCarousel.jsx
import React from "react";

const BadgeCarousel = ({ badges, badgeData }) => {
  const badgeDetails = badges.map((badgeName) =>
    badgeData.find((badge) => badge.name === badgeName)
  );

  return (
    <div className="flex overflow-x-auto space-x-4 p-4 bg-white shadow rounded-lg">
      {badgeDetails.map((badge, idx) => (
        <div key={idx} className="flex-shrink-0">
          <img
            src={`/assets/${badge.name.toLowerCase()}.png`}
            alt={badge.name}
            className="h-24 w-24 rounded-full"
          />
          <p className="text-center text-sm mt-2">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BadgeCarousel;

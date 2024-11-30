import React from 'react';

const UserStats = ({ user }) => {
  return (
    <section className="user-stats">
      <h2>User Stats</h2>
      <div className="stats">
        <p><strong>Register Number:</strong> {user?.registerNumber}</p>
        <p><strong>Progress XP:</strong> {user?.xp}</p>
        <p><strong>Achievements:</strong> {user?.achievements}</p>
      </div>
    </section>
  );
};

export default UserStats;

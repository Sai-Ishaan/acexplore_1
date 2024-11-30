// components/UserDetails.jsx
import React from "react";

const calculateXP = (badges) => badges.length * 20;

const UserDetails = ({ user }) => {
  const xp = calculateXP(user.badges);
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-700">Email: {user.email}</p>
      <p className="text-gray-700">Register No: {user.registerNumber}</p>
      <p className="text-blue-500 font-semibold">XP: {xp}</p>
    </div>
  );
};

export default UserDetails;

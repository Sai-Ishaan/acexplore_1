import React from "react";

const ProgressBar = ({ xp }) => {
  const progress = Math.min((xp / 5000) * 100, 100); // Max XP is 5000
  return (
    <div className="w-full bg-gray-200 rounded-full h-6">
      <div
        className="bg-green-500 h-6 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;

import React, { useState } from 'react';
import './LightBulbSwitch.css';

const LightBulbSwitch = ({ isDarkMode, toggleDarkMode }) => {
  const [stringPulled, setStringPulled] = useState(false);

  const handlePullString = () => {
    setStringPulled(!stringPulled);
    toggleDarkMode();
  };

  return (
    <div className="light-bulb-switch">
      {/* Bulb Container */}
      <div className={`bulb-container ${isDarkMode ? 'dark' : 'light'}`}>
        {/* Bulb Glass */}
        <div className="bulb-glass">
          {/* Filament */}
          <div className={`filament ${isDarkMode ? 'off' : 'on'}`}></div>
        </div>

        {/* Bulb Base */}
        <div className="bulb-base"></div>

        {/* String */}
        <div className="string-container">
          <div 
            className={`pull-string ${stringPulled ? 'pulled' : ''}`}
            onClick={handlePullString}
          >
            <div className="string-handle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightBulbSwitch;
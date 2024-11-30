import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LightBulbSwitch from './LightBulbSwitch';
import './dashboard.css';
import badgeData from '../data/badge.json';
import users from '../data/data.json';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [userBadges, setUserBadges] = useState([]);
    const [userProgress, setUserProgress] = useState(0);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            setUserBadges(user.badges);
            setUserProgress(user.xp);  // Assuming `xp` is part of user data
        }
    }, [user, navigate]);

    const getBadgeDetails = (badgeName) => {
        const badge = badgeData.find(b => b.name === badgeName);
        return badge || { name: badgeName, description: 'No description available', shareLink: '#' };
    };

    return (
        <div className={`dashboard ${isDarkMode ? 'dark' : 'light'}`}>
            <header className="dashboard-header">
                <LightBulbSwitch 
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode} 
                />
                <h1>Welcome, {user?.name}</h1>
                <p>Register Number: {user?.registerNumber}</p>
                <p>Progress: {userProgress} XP</p>
            </header>

            <section className="badges-section">
                <h2>Your Badges</h2>
                <div className="badge-container">
                    {userBadges.length > 0 ? (
                        userBadges.map((badgeName, index) => {
                            const badgeDetails = getBadgeDetails(badgeName);
                            return (
                                <div className="badge-card" key={index}>
                                    <img 
                                        className="badge-img"
                                        src={`/${badgeName.toLowerCase()}.png`} 
                                        alt={badgeDetails.name} 
                                    />
                                    <div className="badge-info">
                                        <h3>{badgeDetails.name}</h3>
                                        <p>{badgeDetails.description}</p>
                                        <a href={badgeDetails.shareLink} target="_blank" rel="noopener noreferrer">
                                            Share on LinkedIn
                                        </a>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No badges earned yet!</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

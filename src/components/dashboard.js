import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    FaChevronLeft, 
    FaChevronRight, 
    FaMoon, 
    FaSun,
    FaWhatsapp,
    FaLinkedin,
    FaTwitter
} from 'react-icons/fa';
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Fade } from 'react-awesome-reveal';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactTyped } from 'react-typed';
import badgeData from '../data/badge.json';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [userBadges, setUserBadges] = useState([]);
    const [userProgress, setUserProgress] = useState(0);
    const [skillsData, setSkillsData] = useState([]);
    const badgeScrollContainerRef = useRef(null);

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        
        setUserBadges(user.badges || []);
        setUserProgress(user.xp || 0);

        const skills = Object.entries(user.activity || {}).reduce((acc, [month, value]) => {
            if (value > 0) acc.push({ skill: month, value });
            return acc;
        }, []);
        setSkillsData(skills);
    }, [user, navigate]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: isDarkMode ? '#ffffff' : '#1a1a1a'
                }
            }
        },
        scales: {
            y: {
                grid: {
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: isDarkMode ? '#ffffff' : '#1a1a1a'
                }
            },
            x: {
                grid: {
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: isDarkMode ? '#ffffff' : '#1a1a1a'
                }
            }
        }
    };

    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'XP Progress',
            data: [300, 600, 900, 1200, 1500, 1800, userProgress],
            borderColor: '#4BC0C0',
            backgroundColor: isDarkMode ? 'rgba(75,192,192,0.3)' : 'rgba(75,192,192,0.2)',
            tension: 0.4,
            borderWidth: 2
        }]
    };

    const doughnutChartData = {
        labels: skillsData.map(skill => skill.skill),
        datasets: [{
            label: 'Skills Distribution',
            data: skillsData.map(skill => skill.value),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderWidth: 2,
            borderColor: isDarkMode ? '#1e1e1e' : '#ffffff'
        }]
    };

    const barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Monthly Contributions',
            data: [12, 19, 8, 15, 10, 20],
            backgroundColor: isDarkMode ? 'rgba(75,192,192,0.8)' : 'rgba(75,192,192,0.6)',
            borderColor: '#4BC0C0',
            borderWidth: 1
        }]
    };

    const scrollBadges = (direction) => {
        if (badgeScrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            badgeScrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const getBadgeData = (badgeName) => 
        badgeData.find((badge) => badge.name.toLowerCase() === badgeName.toLowerCase());

    return (
        <div className={`dashboard container-fluid ${isDarkMode ? 'dark' : 'light'}`}>
            <header className="dashboard-header text-center mb-4">
                <h1>
                    <span className="welcome-message">
                        <ReactTyped
                            strings={[`Welcome, ${user ? user.name : "Guest"}`]}
                            typeSpeed={100}
                            backSpeed={50}
                            showCursor={false}
                        />
                    </span>
                </h1>
                <p className="user-info">Register Number: {user?.registerNumber}</p>
                <p className="progress-info">Progress: {userProgress} XP</p>
                <button 
                    className="toggle-mode-btn"
                    onClick={toggleDarkMode}
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>
            </header>

            <Fade cascade damping={0.1}>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-header">Your Badges</div>
                            <div className="card-body position-relative">
                                <button
                                    className="scroll-arrow"
                                    onClick={() => scrollBadges('left')}
                                    aria-label="Scroll left"
                                >
                                    <FaChevronLeft />
                                </button>
                                <div
                                    className="badge-list"
                                    ref={badgeScrollContainerRef}
                                >
                                    {userBadges.map((badge, index) => {
                                        const badgeDetails = getBadgeData(badge);
                                        const imageUrl = `/assets/${badgeDetails?.name.toLowerCase()}.jpeg`;

                                        return badgeDetails ? (
                                            <div key={index} className="badge-item">
                                                <img
                                                    src={imageUrl}
                                                    alt={badgeDetails.name}
                                                    className="badge-image"
                                                    loading="lazy"
                                                />
                                                <p className="badge-name">{badgeDetails.name}</p>
                                                <div className="badge-share">
                                                    <WhatsappShareButton url={badgeDetails.shareLink} className="share-button">
                                                        <FaWhatsapp size={20} />
                                                        <span>Share on WhatsApp</span>
                                                    </WhatsappShareButton>
                                                    
                                                    <LinkedinShareButton url={badgeDetails.shareLink} className="share-button">
                                                        <FaLinkedin size={20} />
                                                        <span>Share on LinkedIn</span>
                                                    </LinkedinShareButton>
                                                    
                                                    <TwitterShareButton url={badgeDetails.shareLink} className="share-button">
                                                        <FaTwitter size={20} />
                                                        <span>Share on Twitter</span>
                                                    </TwitterShareButton>
                                                </div>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                                <button
                                    className="scroll-arrow"
                                    onClick={() => scrollBadges('right')}
                                    aria-label="Scroll right"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-header">Skills Distribution</div>
                            <div className="card-body chart-container">
                                <Doughnut data={doughnutChartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-header">XP Progress Over Time</div>
                            <div className="card-body chart-container">
                                <Line data={lineChartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">Monthly Contributions</div>
                            <div className="card-body chart-container">
                                <Bar data={barChartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default Dashboard;
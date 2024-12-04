import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaShareAlt, FaMoon, FaSun } from 'react-icons/fa';
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Fade } from 'react-awesome-reveal';
//import ReactTyped from 'react-typed';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend);

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [userBadges, setUserBadges] = useState([]);
    const [userProgress, setUserProgress] = useState(0);
    const [skillsData, setSkillsData] = useState([]);
    const badgeScrollContainerRef = useRef(null);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            setUserBadges(user.badges || []);
            setUserProgress(user.xp || 0);

            const skills = Object.entries(user.activity || {}).reduce((acc, [month, value]) => {
                if (value > 0) acc.push({ skill: month, value });
                return acc;
            }, []);
            setSkillsData(skills);
        }
    }, [user, navigate]);

    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'XP Progress',
                data: [300, 600, 900, 1200, 1500, 1800, userProgress],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.4,
            },
        ],
    };

    const doughnutChartData = {
        labels: skillsData.map(skill => skill.skill),
        datasets: [
            {
                label: 'Skills Distribution',
                data: skillsData.map(skill => skill.value),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Contributions',
                data: [12, 19, 8, 15, 10, 20],
                backgroundColor: '#4BC0C0',
            },
        ],
    };

    const scrollBadges = (direction) => {
        if (badgeScrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            badgeScrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

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
    <p>Register Number: {user?.registerNumber}</p>
    <p>Progress: {userProgress} XP</p>
    <button className="btn btn-outline-secondary toggle-mode" onClick={toggleDarkMode}>
        {isDarkMode ? <FaSun /> : <FaMoon />} Toggle Mode
    </button>
</header>
            <Fade cascade damping={0.1}>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">Your Badges</div>
                            <div className="card-body">
                                <button
                                    className="scroll-arrow btn btn-sm btn-light"
                                    onClick={() => scrollBadges('left')}
                                >
                                    <FaChevronLeft />
                                </button>
                                <div
                                    className="badge-list d-flex overflow-auto"
                                    ref={badgeScrollContainerRef}
                                >
                                    {userBadges.map((badge, index) => (
                                        <div key={index} className="badge-item text-center mx-2">
                                            <img
                                                src={`../assets/img/${badge.toLowerCase()}.png`}
                                                alt={badge}
                                                className="badge-image"
                                            />
                                            <p className="badge-name">{badge}</p>
                                            <div className="badge-share d-flex flex-wrap justify-content-center">
                                                <WhatsappShareButton
                                                    url={`https://badge-link.com/${badge}`}
                                                    className="mx-1"
                                                >
                                                    <FaShareAlt />
                                                </WhatsappShareButton>
                                                <LinkedinShareButton
                                                    url={`https://badge-link.com/${badge}`}
                                                    className="mx-1"
                                                >
                                                    <FaShareAlt />
                                                </LinkedinShareButton>
                                                <TwitterShareButton
                                                    url={`https://badge-link.com/${badge}`}
                                                    className="mx-1"
                                                >
                                                    <FaShareAlt />
                                                </TwitterShareButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="scroll-arrow btn btn-sm btn-light"
                                    onClick={() => scrollBadges('right')}
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-header bg-success text-white">Skills Distribution</div>
                            <div className="card-body">
                                <Doughnut data={doughnutChartData} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-header bg-info text-white">XP Progress Over Time</div>
                            <div className="card-body">
                                <Line data={lineChartData} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card shadow-sm">
                            <div className="card-header bg-warning text-white">Monthly Contributions</div>
                            <div className="card-body">
                                <Bar data={barChartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default Dashboard;

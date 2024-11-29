import React, { useEffect, useState } from 'react';
import TypingEffect from './TypingEffect';
import TypingText from './TypingText';
import PongBackground from './PongBackground';
import './Home.css';
import { ReactTyped } from 'react-typed';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from './LoadingScreen';
import users from '../data/data.json';
import LightBulbSwitch from './LightBulbSwitch';

const Home = () => {
    const [registerNumber, setRegisterNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showTypedText, setShowTypedText] = useState(false);
    const navigate = useNavigate();
    const [aboutVisible, setAboutVisible] = useState(false);
    const [typingParagraphVisible, setTypingParagraphVisible] = useState(false);
    const [ruleIndex, setRuleIndex] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleRegisterNum = (e) => setRegisterNumber(e.target.value);
    
    const handleButtonClick = () => {
        const user = users.find(user => user.registerNumber === registerNumber);
        if (user) {
            toast.success("Login Successful!");
            setIsLoading(true);
            setTimeout(() => {
                navigate('/dashboard', { state: { user } });
                setIsLoading(false);
            }, 2000);
        } else {
            toast.error("Invalid Register Number! Please try again");
        }
    };

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  
    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowTypedText(true);
            setAboutVisible(true);
        }, 6000);
        const timer2 = setTimeout(() => {
            setTypingParagraphVisible(true);
        }, 7500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    useEffect(() => {
        if (typingParagraphVisible && ruleIndex < rules.length) {
            const timer = setTimeout(() => {
                setRuleIndex((prevIndex) => prevIndex + 1);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [typingParagraphVisible, ruleIndex]);
    
    const rules = [
        "> Discover New Events",
        "> Participate",
        "> Explore your progress",
        "> Share your achievements"
    ];
    
    return (
        <>  
        <div id="ba" className={isDarkMode ? 'dark-mode' : 'light-mode'}>
            {/* Add PongBackground component */}
            <PongBackground isDarkMode={isDarkMode}/>

            <ToastContainer />
            {isLoading && <LoadingScreen />}
            <nav className="navbar">
                <h1 className="navbar-logo">
                    <span className="navbar-logo-highlight">Ace</span>Xplore
                </h1>
                <ul className="navbar-links">
                    <li>
                        <a href="#home" className="navbar-link">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="navbar-link">
                            About
                        </a>
                    </li>
                </ul>
                <LightBulbSwitch 
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode} 
                />
            </nav>

            <section className="p-8 text-center relative z-10" id="home">
            <PongBackground isDarkMode={isDarkMode}/>

                <h1 className="text-7xl font-semibold mb-4">
                    <TypingEffect 
                        text="Welcome To AceXplore!!" 
                        isDarkMode={isDarkMode} 
                        typingSpeed={110} 
                        revealSpeed={150}
                        cursorChar="|" 
                    />
                </h1>
                <p className="mb-7">
                    Join us to{" "}
                    {showTypedText && (
                        <ReactTyped 
                            strings={[
                                `<span class="typed-text"> Code </span>`, 
                                `<span class="typed-text"> Build </span>`, 
                                `<span class="typed-text"> Progress </span>`, 
                            ]}
                            typeSpeed={100}
                            loop
                            backSpeed={20}
                            cursorChar=">"
                            showCursor={true}
                        />
                    )}
                </p>
                <input
                    type="text"
                    value={registerNumber}
                    onChange={handleRegisterNum}
                    placeholder="Enter your Register Number:"
                    className="input-field"
                />
                <button onClick={handleButtonClick} className="dashboard-button">
                    Go to Dashboard
                </button>
            </section>
    
            <section id="about" className={`about-card relative z-10 ${aboutVisible ? 'slide-in' : ''}`}>
            <PongBackground isDarkMode={isDarkMode}/>

                <p className="main-heading">An ACE-Ful way to Celebrate Participation Success</p>
                <p className="subtext">
                    At <span className="highlighted-text">ACE</span>, we believe in recognizing every milestone.
                    Our platform is designed to celebrate your achievements, no matter how big or small. Join us
                    to discover exciting new events!!
                </p>
                <p className="subtext">
                    <span className="highlighted-text">AceXplore</span> brings together innovators and achievers. We celebrate
                    every step of your journey and recognize the hard work it takes to progress.
                </p>
                <p className="rules-title">The Rules are simple:</p>
                {rules.slice(0, ruleIndex).map((rule, index) => (
                    <TypingText 
                        key={index} 
                        text={rule} 
                        typingSpeed={50} 
                        className="fade-in-paragraph" 
                        cursorChar="|" 
                    />
                ))}
                <div className="additional-content mt-6">
                    <button className="explore-button">Explore More</button>
                </div>
            </section>
        </div>
        </>
    );
};

export default Home;
import React, { useEffect, useState } from 'react';
import spotifyImage from './images/spotify.png';
import { authUrl } from './config';

const LandingPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [publicWraps, setPublicWraps] = useState([]);

    useEffect(() => {
        // Fetch public wraps
        fetch('http://127.0.0.1:8000/api/get-public-wraps')
            .then(response => response.json())
            .then(data => setPublicWraps(data.public_wraps))
            .catch(error => console.error("Error fetching public wraps:", error));
    }, []);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleSpotifyLogin = () => {
        window.location.href = authUrl;
    };

    
    return (
        <div
            className={`${
                isDarkMode
                    ? 'bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#1DB954] text-white'
                    : 'bg-gradient-to-br from-[#f0f4f8] via-[#dfe6ed] to-[#cbd5e0] text-black'
            } flex flex-col items-center justify-center min-h-screen py-[2.5vh] px-[2.5vw] transition-colors duration-300 relative`}
        >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black to-[#1DB954] opacity-10 pointer-events-none"></div>
    
            {/* Theme Toggle */}
            <button
                className="absolute top-[1.5vh] right-[1.5vw] bg-green-500 text-white px-[1.2vw] py-[0.8vh] text-[0.8vw] rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
                onClick={toggleTheme}
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
    
            {/* Header */}
            <div className="bg-[#1DB954] text-white w-full max-w-[50vw] p-[1.5vh] rounded-3xl shadow-2xl flex items-center space-x-[1vw] transform transition duration-300 hover:scale-105">
                <img
                    src={spotifyImage}
                    alt="Spotify Logo"
                    className="w-[4vw] h-[4vw] rounded-full shadow-lg"
                />
                <h1 className="text-[3vw] font-extrabold tracking-wide animate-bounce-slow">
                    Spotify Wrapped
                </h1>
            </div>
    
            {/* Login Section */}
            <div className="bg-[#181818] w-full max-w-[35vw] mt-[3vh] rounded-3xl shadow-2xl p-[1.5vh] text-center transition hover:shadow-3xl">
                <p className="text-[1.2vw] text-gray-300 mb-[1.5vh]">
                    Discover your year in music!
                </p>
                <button
                    className="bg-green-500 text-white px-[2vw] py-[0.8vh] text-[1vw] rounded-full hover:bg-green-600 transition-transform duration-200 transform hover:scale-110"
                    onClick={handleSpotifyLogin}
                >
                    Log in with Spotify
                </button>
            </div>
    
            {/* Public Wraps Section */}
            <h2 className="text-[2vw] font-bold mt-[3vh] text-[#1DB954] mb-[1.5vh]">
                Public Spotify Wraps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5vw] w-full max-w-[55vw]">
                {publicWraps.length > 0 ? (
                    publicWraps.map((wrap, index) => (
                        <div
                            key={index}
                            className="bg-[#282828] text-white rounded-3xl p-[1.5vh] shadow-xl transform hover:scale-105 transition duration-300 hover:shadow-2xl"
                        >
                            <div className="flex items-center space-x-[1vw] mb-[1.5vh]">
                                <img
                                    src={wrap.profile_image_url}
                                    alt="Profile"
                                    className="w-[3.5vw] h-[3.5vw] rounded-full border-2 border-[#1DB954]"
                                />
                                <div>
                                    <h3 className="text-[1.5vw] font-semibold">
                                        {wrap.display_name}
                                    </h3>
                                    <p className="text-[1vw] text-gray-400">
                                        Country: {wrap.country}
                                    </p>
                                </div>
                            </div>
                            <p className="text-[1vw] text-gray-300 mb-[1.5vh]">
                                {wrap.fun_fact}
                            </p>
                            <button
                                className="bg-[#1DB954] text-white px-[1.5vw] py-[0.8vh] text-[1vw] rounded-lg hover:bg-green-600 transition duration-200"
                                onClick={() =>
                                    window.location.href = `/wrap/${wrap.spotify_user_id}`
                                }
                            >
                                View Spotify Wrapped
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-[1.2vw] text-center text-gray-300 col-span-2">
                        No public wraps available.
                    </p>
                )}
            </div>
    
            {/* Additional Animations */}
            <style jsx>{`
                .animate-bounce-slow {
                    animation: bounce 3s infinite;
                }
                @keyframes bounce {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </div>
    );
    

    

};

export default LandingPage;





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
        <div className={`${isDarkMode ? 'bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#1DB954] text-white' : 'bg-gradient-to-br from-[#f0f4f8] via-[#dfe6ed] to-[#cbd5e0] text-black'} flex flex-col items-center justify-center min-h-screen py-20 transition-colors duration-300 relative`}>
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black to-[#1DB954] opacity-10 pointer-events-none"></div>

            {/* Theme Toggle */}
            <button
                className="absolute top-12 right-12 bg-green-500 text-white px-8 py-3 text-xl rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
                onClick={toggleTheme}
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* Header with Larger Font and Enhanced Style */}
            <div className="bg-[#1DB954] text-white w-full max-w-7xl p-12 rounded-3xl shadow-2xl flex items-center space-x-8 transform transition duration-300 hover:scale-105">
                <img src={spotifyImage} alt="Spotify Logo" className="w-28 h-28 rounded-full shadow-lg" />
                <h1 className="text-6xl font-extrabold tracking-wide animate-bounce-slow">Spotify Wrapped</h1>
            </div>

            {/* Login Section */}
            <div className="bg-[#181818] w-full max-w-5xl mt-16 rounded-3xl shadow-2xl p-12 text-center transition hover:shadow-3xl">
                <p className="text-3xl text-gray-300 mb-8">Discover your year in music!</p>
                <button
                    className="bg-green-500 text-white px-12 py-5 text-2xl rounded-full hover:bg-green-600 transition-transform duration-200 transform hover:scale-110"
                    onClick={handleSpotifyLogin}
                >
                    Log in with Spotify
                </button>
            </div>

            {/* Public Wraps Section */}
            <h2 className="text-5xl font-bold mt-20 text-[#1DB954] mb-10">Public Spotify Wraps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">
                {publicWraps.length > 0 ? (
                    publicWraps.map((wrap, index) => (
                        <div key={index} className="bg-[#282828] text-white rounded-3xl p-10 shadow-xl transform hover:scale-105 transition duration-300 hover:shadow-2xl">
                            <div className="flex items-center space-x-6 mb-6">
                                <img
                                    src={wrap.profile_image_url}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full border-2 border-[#1DB954]"
                                />
                                <div>
                                    <h3 className="text-3xl font-semibold">{wrap.display_name}</h3>
                                    <p className="text-xl text-gray-400">Country: {wrap.country}</p>
                                </div>
                            </div>
                            <p className="text-xl text-gray-300 mb-6">{wrap.fun_fact}</p>
                            <button
                                className="bg-[#1DB954] text-white px-8 py-3 text-xl rounded-lg hover:bg-green-600 transition duration-200"
                                onClick={() => window.location.href = `/wrap/${wrap.spotify_user_id}`}
                            >
                                View Spotify Wrapped
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-3xl text-center text-gray-300 col-span-2">No public wraps available.</p>
                )}
            </div>

            {/* Additional Animations */}
            <style jsx>{`
                .animate-bounce-slow {
                    animation: bounce 3s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;

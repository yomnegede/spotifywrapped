import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const TopGenres = () => {
    const navigate = useNavigate();
    const { topGenres } = useContext(SpotifyContext);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        navigate('/');
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <div
            className={`${
                isDarkMode
                    ? 'bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#1DB954] text-white'
                    : 'bg-gradient-to-br from-[#f0f4f8] via-[#dfe6ed] to-[#cbd5e0] text-black'
            } min-h-screen flex flex-col items-center py-20 px-10 transition-colors duration-300`}
        >
            {/* Theme Toggle and Profile Button Container */}
            <div className="absolute top-10 right-10 flex space-x-4">
                <button
                    className="bg-green-500 text-white px-8 py-3 text-xl rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-blue-500 text-white px-8 py-3 text-xl rounded-full shadow-md hover:bg-blue-600 transition-transform duration-200 focus:outline-none"
                >
                    Profile
                </button>
            </div>

            {/* Log Out Button */}
            <button
                className="absolute top-10 left-10 bg-red-600 text-white px-8 py-3 text-xl rounded-full shadow-md hover:bg-red-700 transition-transform duration-200 focus:outline-none"
                onClick={handleLogout}
            >
                Log out
            </button>

            {/* Title */}
            <h1 className="text-7xl font-extrabold mb-20 drop-shadow-lg animate-bounce">Top Genres</h1>

            {/* Genres Grid */}
            {topGenres.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
                    {topGenres.map((genre, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center bg-[#282828] text-white rounded-full p-10 shadow-2xl transform transition hover:scale-125 hover:rotate-3 hover:shadow-3xl animate-fade-in"
                            style={{
                                animationDelay: `${index * 0.2}s`, // Staggered animation delay
                                animationDuration: '0.8s',
                            }}
                        >
                            <p className="text-4xl font-bold text-center">{genre}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-4xl font-semibold mt-16 animate-pulse">
                    Loading top genres...
                </p>
            )}

            {/* Navigation Buttons */}
            <div className="flex space-x-8 mt-20">
                <button
                    onClick={() => navigate('/TopSongs')}
                    className="bg-green-500 text-white px-12 py-6 text-2xl rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Back
                </button>
                <button
                    onClick={() => navigate('/TopAlbums')}
                    className="bg-green-500 text-white px-12 py-6 text-2xl rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TopGenres;

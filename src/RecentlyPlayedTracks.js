import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const RecentlyPlayedTracks = () => {
    const navigate = useNavigate();
    const { recentlyPlayed } = useContext(SpotifyContext);
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
                    : 'bg-[#f0f4f8] text-black'
            } min-h-screen flex flex-col items-center py-20 px-10 transition-colors duration-300`}
        >
            {/* Theme Toggle and Profile Button */}
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
            <h1 className="text-8xl font-extrabold mb-16 drop-shadow-lg animate-slide-in">
                Recently Played Tracks
            </h1>

            {/* Tracks Section */}
            {recentlyPlayed.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-12">
                    {recentlyPlayed.map((track, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] text-white rounded-3xl p-6 shadow-lg transform transition hover:scale-105 hover:shadow-2xl animate-fade-in flex flex-col items-center w-80"
                            style={{
                                animationDelay: `${index * 0.2}s`,
                                animationDuration: '0.8s',
                            }}
                        >
                            <img
                                src={track.imageUrl}
                                alt={track.name}
                                className="w-40 h-40 object-cover rounded-full mb-4 border-4 border-green-500"
                            />
                            <p className="text-3xl font-bold text-center">{track.name}</p>
                            <p className="text-xl text-gray-400 text-center mt-2">{track.artist}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-4xl font-semibold mt-16 animate-pulse">
                    Loading recently played tracks...
                </p>
            )}

            {/* Navigation Buttons */}
            <div className="flex space-x-8 mt-20">
                <button
                    onClick={() => navigate('/FunFact')}
                    className="bg-green-500 text-white px-16 py-8 text-2xl rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Back
                </button>
                <button
                    onClick={() => navigate('/SavedShows')}
                    className="bg-green-500 text-white px-16 py-8 text-2xl rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RecentlyPlayedTracks;

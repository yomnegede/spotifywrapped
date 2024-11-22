import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const TopAlbums = () => {
    const navigate = useNavigate();
    const { topAlbums, playTopSongs } = useContext(SpotifyContext);
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
                    ? 'bg-[#0B0B0B] text-white'
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
            <h1 className="text-8xl font-extrabold mb-20 drop-shadow-lg animate-slide-in">
                Top Albums
            </h1>

            {/* Albums Section */}
            {topAlbums.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {topAlbums.map((album, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] text-white rounded-xl p-8 shadow-lg transform transition hover:scale-110 hover:shadow-3xl animate-fade-in flex flex-col"
                            style={{
                                animationDelay: `${index * 0.2}s`,
                                animationDuration: '0.8s',
                            }}
                        >
                            <div className="relative w-full">
                                <img
                                    src={album.imageUrl}
                                    alt={album.name}
                                    className="w-full h-72 object-cover rounded-t-xl"
                                />
                                <div className="absolute inset-0 bg-green-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                            </div>
                            <div className="mt-6">
                                <p className="text-4xl font-bold text-center">{album.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-4xl font-semibold mt-16 animate-pulse">
                    Loading top albums...
                </p>
            )}

            {/* Navigation Buttons */}
            <div className="flex space-x-8 mt-20">
                <button
                    onClick={() => {
                        navigate('/TopGenres')
                        playTopSongs();
                    }}
                    className="bg-green-500 text-white px-16 py-8 text-2xl rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        navigate('/FunFact')
                        playTopSongs();
                    }}
                    className="bg-green-500 text-white px-16 py-8 text-2xl rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TopAlbums;

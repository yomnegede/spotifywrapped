import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext'; // Import the context

const TopArtists = () => {
    const navigate = useNavigate();
    const { topArtists,playTopSongs } = useContext(SpotifyContext); // Use global state
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isVisible, setIsVisible] = useState(false); // For animation
    

    useEffect(() => {
        // Trigger the fade-in animation when the component is mounted
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer); // Clean up the timer when unmounting
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        navigate('/'); // Redirect to the landing page
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <div
            className={`${
                isDarkMode
                    ? 'bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#1DB954] text-white'
                    : 'bg-gradient-to-br from-[#f0f4f8] via-[#dfe6ed] to-[#cbd5e0] text-black'
            } min-h-screen flex flex-col items-center py-20 px-10 transition-colors duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            } transform transition-opacity duration-700`}
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

            <h1 className="text-8xl font-extrabold mb-20 drop-shadow-lg animate-pulse">Top Artists</h1>
            {topArtists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                    {topArtists.map((artist, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-[#282828] text-white rounded-3xl p-12 shadow-2xl transform transition hover:scale-110 hover:shadow-3xl"
                        >
                            <img
                                src={artist.imageUrl}
                                alt={artist.name}
                                className="w-72 h-72 rounded-full mb-8 border-8 border-green-500 transform hover:rotate-3 transition-transform duration-500"
                            />
                            <p className="text-4xl font-bold">{artist.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-4xl font-semibold mt-16 animate-pulse">
                    Loading top artists...
                </p>
            )}

            {/* Next Button */}
            <button
                onClick={() => {
                    navigate('/TopSongs')
                    playTopSongs();
                }
                }
                className="mt-20 bg-green-500 text-white px-20 py-8 text-3xl rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
            >
                Next
            </button>
        </div>
    );
};

export default TopArtists;

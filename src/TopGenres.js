import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const TopGenres = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { playTopSongs } = useContext(SpotifyContext);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const topArtists = location.state?.topArtists;
    const topSongs = location.state?.topSongs;
    const topGenres = location.state?.topGenres;
    const topAlbums = location.state?.topAlbums;
    const funFact = location.state?.funFact;
    const recentlyPlayed = location.state?.recentlyPlayed;
    const userProfile = location.state?.userProfile;
    const savedShows = location.state?.savedShows;
    const isPublic = location.state?.isPublic;
    const spotifyUserId = location.state?.spotifyUserId;

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
            } min-h-screen flex flex-col items-center py-[5vh] px-[5vw] transition-colors duration-300`}
        >
            {/* Theme Toggle and Profile Button Container */}
            <div className="absolute top-[2vh] right-[2vw] flex space-x-[1vw]">
                <button
                    className="bg-green-500 text-white px-[1.5vw] py-[1vh] text-[1vw] rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-blue-500 text-white px-[1.5vw] py-[1vh] text-[1vw] rounded-full shadow-md hover:bg-blue-600 transition-transform duration-200 focus:outline-none"
                >
                    Profile
                </button>
            </div>
    
            {/* Log Out Button */}
            <button
                className="absolute top-[2vh] left-[2vw] bg-red-600 text-white px-[1.5vw] py-[1vh] text-[1vw] rounded-full shadow-md hover:bg-red-700 transition-transform duration-200 focus:outline-none"
                onClick={handleLogout}
            >
                Log out
            </button>
    
            {/* Title */}
            <h1 className="text-[4vw] font-extrabold mb-[4vh] drop-shadow-lg animate-bounce">
                Top Genres
            </h1>
    
            {/* Genres Grid */}
            {topGenres.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[2vw]">
                    {topGenres.map((genre, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center bg-[#282828] text-white rounded-full p-[2vw] shadow-2xl transform transition hover:scale-110 hover:rotate-3 hover:shadow-3xl animate-fade-in"
                            style={{
                                animationDelay: `${index * 0.2}s`, // Staggered animation delay
                                animationDuration: '0.8s',
                            }}
                        >
                            <p className="text-[1.5vw] font-bold text-center">{genre}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-[1.5vw] font-semibold mt-[2vh] animate-pulse">
                    Loading top genres...
                </p>
            )}
    
            {/* Navigation Buttons */}
            <div className="flex space-x-[2vw] mt-[5vh]">
                <button
                    onClick={() => {
                        navigate('/TopSongs', {
                            state: {
                                topArtists,
                                topSongs,
                                topGenres,
                                topAlbums,
                                funFact,
                                recentlyPlayed,
                                userProfile,
                                savedShows,
                                isPublic,
                                spotifyUserId,
                            },
                        });
                        playTopSongs()
                    }}
                    className="bg-green-500 text-white px-[2vw] py-[1.2vh] text-[1.2vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        navigate('/TopAlbums', {
                            state: {
                                topArtists,
                                topSongs,
                                topGenres,
                                topAlbums,
                                funFact,
                                recentlyPlayed,
                                userProfile,
                                savedShows,
                                isPublic,
                                spotifyUserId,
                            },
                        });
                        playTopSongs()
                    }}
                    className="bg-green-500 text-white px-[2vw] py-[1.2vh] text-[1.2vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
    
};

export default TopGenres;

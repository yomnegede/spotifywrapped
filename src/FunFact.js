import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const FunFact = () => {
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
                    ? 'bg-[#0B0B0B] text-white'
                    : 'bg-[#f0f4f8] text-black'
            } min-h-screen flex flex-col items-center py-[5vh] px-[5vw] transition-colors duration-300`}
        >
            {/* Theme Toggle and Profile Button */}
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
            <h1 className="text-[4vw] font-extrabold mb-[4vh] drop-shadow-lg animate-slide-in">
                Fun Fact
            </h1>
    
            {/* Fun Fact Content */}
            <p className="text-[2vw] font-medium text-center mb-[4vh] animate-fade-in">
                {funFact || "Loading your fun fact..."}
            </p>
    
            {/* Navigation Buttons */}
            <div className="flex space-x-[2vw] mt-[5vh]">
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
                        playTopSongs();
                    }}
                    className="bg-green-500 text-white px-[2vw] py-[1.5vh] text-[1.2vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        navigate('/RecentlyPlayedTracks', {
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
                        playTopSongs();
                    }}
                    className="bg-green-500 text-white px-[2vw] py-[1.5vh] text-[1.2vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
    
};

export default FunFact;

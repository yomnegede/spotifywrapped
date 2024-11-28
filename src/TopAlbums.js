import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const TopAlbums = () => {
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
                Top Albums
            </h1>
    
            {/* Albums Section */}
            {topAlbums.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3vw]">
                    {topAlbums.map((album, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] text-white rounded-xl p-[2vw] shadow-lg transform transition hover:scale-105 hover:shadow-3xl animate-fade-in flex flex-col"
                            style={{
                                animationDelay: `${index * 0.2}s`,
                                animationDuration: '0.8s',
                            }}
                        >
                            <div className="relative w-full">
                                <img
                                    src={album.imageUrl}
                                    alt={album.name}
                                    className="w-full h-[20vh] object-cover rounded-t-xl"
                                />
                                <div className="absolute inset-0 bg-green-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                            </div>
                            <div className="mt-[2vh]">
                                <p className="text-[1.5vw] font-bold text-center">{album.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-[1.5vw] font-semibold mt-[2vh] animate-pulse">
                    Loading top albums...
                </p>
            )}
    
            {/* Navigation Buttons */}
            <div className="flex space-x-[2vw] mt-[5vh]">
                <button
                    onClick={() => {
                        navigate('/TopGenres', {
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
                    }}
                    className="bg-green-500 text-white px-[2vw] py-[1.2vh] text-[1.2vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        navigate('/FunFact', {
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
                    }}
                    className="bg-green-500 text-white px-[2vw] py-[1.2vh] text-[1.2vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
    
};

export default TopAlbums;

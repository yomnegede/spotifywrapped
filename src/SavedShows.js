import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const SavedShows = () => {
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
                    : 'bg-[#f0f4f8] text-black'
            } min-h-screen flex flex-col items-center py-20 px-10 transition-colors duration-300`}
        >
            {/* Theme Toggle and Profile Button */}
            <div className="absolute top-[2vh] right-[2vw] flex space-x-[1.5vw]">
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
            <h1 className="text-[4vw] font-extrabold mb-[5vh] drop-shadow-lg animate-slide-in">
                Saved Shows
            </h1>
    
            {/* Shows Section */}
            {savedShows.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[3vw]">
                    {savedShows.map((show, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] text-white rounded-3xl shadow-lg p-[2vw] transform transition hover:scale-105 hover:shadow-2xl animate-fade-in"
                            style={{
                                animationDelay: `${index * 0.2}s`,
                                animationDuration: '0.8s',
                            }}
                        >
                            <img
                                src={show.imageUrl}
                                alt={show.name}
                                className="w-[15vw] h-[15vw] object-cover rounded-xl mb-[2vh] mx-auto"
                            />
                            <p className="text-[2vw] font-bold text-center">{show.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-[2vw] font-semibold mt-[3vh] animate-pulse">
                    Loading saved shows...
                </p>
            )}
    
            {/* Navigation Buttons */}
            <div className="flex space-x-[2vw] mt-[5vh]">
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
                    className="bg-green-500 text-white px-[2vw] py-[1.5vh] text-[1.5vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        navigate('/ThankYou', {
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
                    className="bg-green-500 text-white px-[2vw] py-[1.5vh] text-[1.5vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
    
};

export default SavedShows;

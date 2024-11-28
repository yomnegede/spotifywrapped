import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const RecentlyPlayedTracks = () => {
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
            } min-h-screen flex flex-col items-center py-[4vh] px-[4vw] transition-colors duration-300`}
        >
            {/* Theme Toggle and Profile Button */}
            <div className="absolute top-[1.5vh] right-[1.5vw] flex space-x-[1vw]">
                <button
                    className="bg-green-500 text-white px-[1.2vw] py-[0.8vh] text-[0.8vw] rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-blue-500 text-white px-[1.2vw] py-[0.8vh] text-[0.8vw] rounded-full shadow-md hover:bg-blue-600 transition-transform duration-200 focus:outline-none"
                >
                    Profile
                </button>
            </div>
    
            {/* Log Out Button */}
            <button
                className="absolute top-[1.5vh] left-[1.5vw] bg-red-600 text-white px-[1.2vw] py-[0.8vh] text-[0.8vw] rounded-full shadow-md hover:bg-red-700 transition-transform duration-200 focus:outline-none"
                onClick={handleLogout}
            >
                Log out
            </button>
    
            {/* Title */}
            <h1 className="text-[3vw] font-extrabold mb-[3vh] drop-shadow-lg animate-slide-in">
                Recently Played Tracks
            </h1>
    
            {/* Tracks Section */}
            {recentlyPlayed.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-[2vw]">
                    {recentlyPlayed.map((track, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] text-white rounded-3xl p-[1.5vw] shadow-lg transform transition hover:scale-105 hover:shadow-2xl animate-fade-in flex flex-col items-center w-[15vw]"
                            style={{
                                animationDelay: `${index * 0.2}s`,
                                animationDuration: '0.8s',
                            }}
                        >
                            <img
                                src={track.imageUrl}
                                alt={track.name}
                                className="w-[8vw] h-[8vw] object-cover rounded-full mb-[1vh] border-[0.4vw] border-green-500"
                            />
                            <p className="text-[1.5vw] font-bold text-center">{track.name}</p>
                            <p className="text-[1vw] text-gray-400 text-center mt-[0.3vh]">{track.artist}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-[1.5vw] font-semibold mt-[3vh] animate-pulse">
                    Loading recently played tracks...
                </p>
            )}
    
            {/* Navigation Buttons */}
            <div className="flex space-x-[1.5vw] mt-[4vh]">
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
                        playTopSongs();
                    }}
                    className="bg-green-500 text-white px-[1.8vw] py-[1.2vh] text-[1vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        navigate('/SavedShows', {
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
                    className="bg-green-500 text-white px-[1.8vw] py-[1.2vh] text-[1vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
    

};

export default RecentlyPlayedTracks;

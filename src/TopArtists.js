import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpotifyContext from './SpotifyContext'; // Import the context

const TopArtists = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { playTopSongs } = useContext(SpotifyContext); // Use global state
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isVisible, setIsVisible] = useState(false); // For animation

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
            } min-h-screen flex flex-col items-center py-[4vh] px-[4vw] transition-colors duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            } transform transition-opacity duration-700`}
        >
            {/* Theme Toggle and Profile Button Container */}
            <div className="absolute top-[1.5vh] right-[1.5vw] flex space-x-[0.8vw]">
                <button
                    className="bg-green-500 text-white px-[1.5vw] py-[0.8vh] text-[0.9vw] rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-blue-500 text-white px-[1.5vw] py-[0.8vh] text-[0.9vw] rounded-full shadow-md hover:bg-blue-600 transition-transform duration-200 focus:outline-none"
                >
                    Profile
                </button>
            </div>
    
            {/* Log Out Button */}
            <button
                className="absolute top-[1.5vh] left-[1.5vw] bg-red-600 text-white px-[1.5vw] py-[0.8vh] text-[0.9vw] rounded-full shadow-md hover:bg-red-700 transition-transform duration-200 focus:outline-none"
                onClick={handleLogout}
            >
                Log out
            </button>
    
            <h1 className="text-[3vw] font-extrabold mb-[4vh] drop-shadow-lg animate-pulse">
                Top Artists
            </h1>
            {topArtists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5vw]">
                    {topArtists.map((artist, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center bg-[#282828] text-white rounded-3xl p-[2.5vw] shadow-2xl transform transition hover:scale-105 hover:shadow-3xl"
                        >
                            {/* Ranking Badge */}
                            <div className="absolute top-[0.8vw] left-[0.8vw] bg-green-500 text-white text-[0.9vw] font-bold px-[0.8vw] py-[0.4vh] rounded-full shadow-md">
                                #{index + 1}
                            </div>
    
                            <img
                                src={artist.imageUrl}
                                alt={artist.name}
                                className="w-[12vw] h-[12vw] rounded-full mb-[1.5vh] border-[0.8vw] border-green-500 transform hover:rotate-3 transition-transform duration-500"
                            />
                            <p className="text-[1.2vw] font-bold">{artist.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-[1.2vw] font-semibold mt-[2vh] animate-pulse">
                    Loading top artists...
                </p>
            )}
    
            {/* Next Button */}
            <button
                onClick={() => {
                    console.log(spotifyUserId);
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
                    playTopSongs();
                }}
                className="mt-[3vh] bg-green-500 text-white px-[2.5vw] py-[1.2vh] text-[1.2vw] rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
            >
                Next
            </button>
        </div>
    );
    
    
};

export default TopArtists;

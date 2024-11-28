import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import SpotifyContext from './SpotifyContext'; // Import the context

const TopSongs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { playTopSongs } = useContext(SpotifyContext); // State to hold top songs
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [animateClass, setAnimateClass] = useState('opacity-0 translate-x-full');

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
        // Trigger the animation when the component mounts
        const timeout = setTimeout(() => {
            setAnimateClass('opacity-100 translate-x-0');
        }, 100);
        return () => clearTimeout(timeout); // Cleanup
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
            } min-h-screen flex flex-col items-center py-24 px-16 transition-colors duration-300`}
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

            {/* Page Title */}
            <h1
                className={`text-8xl font-extrabold mb-20 drop-shadow-lg transform transition-all duration-1000 ease-out ${animateClass}`}
            >
                Top Songs
            </h1>

            {/* Content Section */}
            {topSongs.length > 0 ? (
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 transform transition-all duration-1000 ease-out ${animateClass}`}
                >
                    {topSongs.map((song, index) => (
                        <div
                            key={index}
                            className="relative bg-[#282828] text-white rounded-3xl p-10 shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:shadow-3xl flex flex-col items-start justify-start"
                        >
                            {/* Ranking Badge */}
                            <div className="absolute top-4 right-4 bg-green-500 text-white text-xl font-bold px-4 py-2 rounded-full shadow-md">
                                #{index + 1}
                            </div>
                            <img
                                src={song.imageUrl}
                                alt={song.title}
                                className="w-72 h-72 rounded-lg mb-6 border-8 border-green-500 transform hover:rotate-2 hover:scale-110 transition-transform duration-500"
                            />
                            <p className="text-4xl font-bold">{song.title}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p
                    className={`text-4xl font-semibold mt-16 animate-pulse transform transition-all duration-1000 ease-out ${animateClass}`}
                >
                    Loading top songs...
                </p>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-24 space-x-12">
                <button
                    onClick={() => {
                        navigate('/TopArtists', {
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
                    className="bg-blue-500 text-white px-20 py-8 text-3xl rounded-full shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none"
                >
                    Back
                </button>
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
                        playTopSongs();
                    }}
                    className="bg-green-500 text-white px-20 py-8 text-3xl rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TopSongs;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext'; // Import the context

const ThankYou = () => {
    const navigate = useNavigate();
    const {
        userProfile,
        spotifyUserId,
        topArtists,
        topSongs,
        topGenres,
        topAlbums,
        recentlyPlayed,
        savedShows,
        isPublic,
        funFact,
        setIsPublic
    } = useContext(SpotifyContext); // Access all data from the context

    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const toggleWrapVisibility = () => {
        setIsPublic(!isPublic);
        alert(`Your wrap is now ${!isPublic ? "public" : "private"}!`);
    };

    // Function to save the wrap data to the database
    const saveWrap = async () => {
        const token = localStorage.getItem("spotify_access_token");
        if (!token) {
            alert("Please log in to save your wrap!");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/save-wrapped', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    spotify_user_id: spotifyUserId,
                    display_name: userProfile?.display_name,
                    email: userProfile?.email,
                    country: userProfile?.country,
                    profile_image_url: userProfile?.images?.[0]?.url || "",
                    top_artists: topArtists,
                    top_songs: topSongs,
                    top_genres: topGenres,
                    top_albums: topAlbums,
                    recently_played: recentlyPlayed,
                    saved_shows: savedShows,
                    fun_fact: funFact,
                    is_public: isPublic
                })
            });

            if (response.ok) {
                alert("Wrap data saved successfully!");
            } else {
                throw new Error("Failed to save wrap data");
            }
        } catch (error) {
            console.error("Error saving wrap data:", error);
            alert("An error occurred while saving your wrap data.");
        }
    };


    return (
        <div
            className={`min-h-screen flex flex-col items-center py-20 px-10 transition-colors duration-300 ${
                isDarkMode
                    ? 'bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#1DB954] text-white'
                    : 'bg-[#f0f4f8] text-black'
            }`}
        >
            {/* Top Navigation: Logout, Theme, and Profile */}
            <div className="absolute top-5 left-5">
                <button
                    onClick={() => navigate('/')}
                    className="bg-red-600 text-white px-8 py-3 text-xl rounded-full shadow-md hover:bg-red-700 transition duration-300 focus:outline-none"
                >
                    Log out
                </button>
            </div>
            <div className="absolute top-5 right-5 flex space-x-4">
                <button
                    onClick={toggleTheme}
                    className="bg-green-500 text-white px-8 py-3 text-xl rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-blue-500 text-white px-8 py-3 text-xl rounded-full shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none"
                >
                    Profile
                </button>
            </div>

            {/* Title */}
            <h1 className="text-8xl font-extrabold mb-16 drop-shadow-lg animate-slide-in">
                Thank You!
            </h1>
            <p className="text-4xl font-medium text-center mb-16 animate-fade-in">
                Hope you enjoyed your 2024 Spotify Wrapped!
            </p>

            {/* Summary Card */}
            <div className="relative bg-[#121212] text-white rounded-3xl p-10 shadow-lg w-full max-w-6xl animate-fade-in">
                {/* Visibility Button */}
                <button
                    onClick={toggleWrapVisibility}
                    className="absolute top-5 right-5 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform duration-300"
                >
                    <img
                        src={
                            isPublic
                                ? "https://cdn.iconscout.com/icon/free/png-512/free-eye-icon-download-in-svg-png-gif-file-formats--feather-pack-user-interface-icons-434039.png?f=webp&w=256"
                                : "https://cdn.iconscout.com/icon/free/png-512/free-eye-icon-download-in-svg-png-gif-file-formats--off-feather-pack-user-interface-icons-434038.png?f=webp&w=256"
                        }
                        alt={isPublic ? "Public" : "Private"}
                        className="w-8 h-8"
                    />
                </button>

                {/* Summary Content */}
                <h2 className="text-4xl font-bold mb-8">Summary</h2>
                {userProfile && (
                    <div className="mb-8">
                        <h3 className="text-3xl font-semibold mb-4">User Profile</h3>
                        <p><strong>Name:</strong> {userProfile.display_name}</p>
                        <p><strong>Email:</strong> {userProfile.email}</p>
                        <p><strong>Country:</strong> {userProfile.country}</p>
                    </div>
                )}
                <div className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4">Top Artists</h3>
                    <p>{topArtists.map(artist => artist.name).join(", ")}</p>
                </div>
                <div className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4">Top Songs</h3>
                    <p>{topSongs.map(song => song.title).join(", ")}</p>
                </div>
                <div className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4">Top Genres</h3>
                    <p>{topGenres.join(", ")}</p>
                </div>
                <div className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4">Top Albums</h3>
                    <p>{topAlbums.map(album => album.name).join(", ")}</p>
                </div>
                <div className="mb-8">
                    <h3 className="text-3xl font-semibold mb-4">Recently Played Tracks</h3>
                    <p>{recentlyPlayed.map(track => `${track.name} by ${track.artist}`).join(", ")}</p>
                </div>
                <div>
                    <h3 className="text-3xl font-semibold mb-4">Saved Shows</h3>
                    <p>{savedShows.map(show => show.name).join(", ")}</p>
                </div>
            </div>

            {/* Save Wrap and Start Over Buttons */}
            <div className="flex space-x-8 mt-16">
                <button
                    onClick={saveWrap}
                    className="bg-green-500 text-white px-16 py-8 text-2xl rounded-full shadow-md hover:bg-green-600 transition duration-300 focus:outline-none"
                >
                    Save Wrap
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="bg-white text-gray-600 px-16 py-8 text-2xl rounded-full shadow-md hover:bg-gray-600 hover:text-white transition duration-300 focus:outline-none"
                >
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default ThankYou;

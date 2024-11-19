import React, { useContext, useEffect } from 'react';
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

    // Function to toggle the wrap's visibility
    const toggleWrapVisibility = () => {
        setIsPublic(!isPublic);
        alert(`Your wrap is now ${!isPublic ? "public" : "private"}!`);
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-400 to-gray-600 p-5">
            <button onClick={() => navigate('/')} className="absolute top-5 left-5 bg-gray-600 text-white px-4 py-2 rounded-full">
                Log out
            </button>
            <button onClick={() => navigate('/profile')} className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/user.png" alt="Profile" className="w-6 h-6" />
            </button>
            <h1 className="text-5xl text-white mb-10 font-bold drop-shadow-lg">Thank You!</h1>
            <p className="text-3xl text-white text-center mb-6">
                Hope you enjoyed your 2024 Spotify Wrapped!
            </p>

            {/* Summary Section */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-4">Summary</h2>
                {userProfile && (
                    <div className="mb-4">
                        <h3 className="text-2xl font-semibold">User Profile</h3>
                        <p><strong>Name:</strong> {userProfile.display_name}</p>
                        <p><strong>Email:</strong> {userProfile.email}</p>
                        <p><strong>Country:</strong> {userProfile.country}</p>
                    </div>
                )}
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Top Artists</h3>
                    <ul className="list-disc ml-6">
                        {topArtists.map((artist, index) => (
                            <li key={index}>{artist.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Top Songs</h3>
                    <ul className="list-disc ml-6">
                        {topSongs.map((song, index) => (
                            <li key={index}>{song.title}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Top Genres</h3>
                    <p>{topGenres.join(", ")}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Top Albums</h3>
                    <ul className="list-disc ml-6">
                        {topAlbums.map((album, index) => (
                            <li key={index}>{album.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Recently Played Tracks</h3>
                    <ul className="list-disc ml-6">
                        {recentlyPlayed.map((track, index) => (
                            <li key={index}>{track.name} by {track.artist}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Saved Shows</h3>
                    <ul className="list-disc ml-6">
                        {savedShows.map((show, index) => (
                            <li key={index}>{show.name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Save Wrap Button */}
            <button
                onClick={saveWrap}
                className="mt-8 bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition"
            >
                Save Wrap
            </button>

            {/* Toggle Wrap Visibility Button */}
            <button
                onClick={toggleWrapVisibility}
                className={`mt-8 px-6 py-3 rounded-lg text-xl transition ${
                    isPublic ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
                {isPublic ? "Make Private" : "Make Public"}
            </button>

            <button
                onClick={() => navigate('/')}
                className="mt-8 bg-white text-gray-600 px-8 py-3 rounded-lg text-xl hover:bg-gray-600 hover:text-white transition"
            >
                Start Over
            </button>
        </div>
    );
};

export default ThankYou;

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
        funFact,
        recentlyPlayed,
        savedShows,
        isPublic,
        setIsPublic
    } = useContext(SpotifyContext); // Access all data from the context

    // Log all data to the console
    useEffect(() => {
        console.log("User Profile:", userProfile);
        console.log("Spotify User ID:", spotifyUserId);
        console.log("Top Artists:", topArtists);
        console.log("Top Songs:", topSongs);
        console.log("Top Genres:", topGenres);
        console.log("Top Albums:", topAlbums);
        console.log("Fun Fact:", funFact);
        console.log("Recently Played Tracks:", recentlyPlayed);
        console.log("Saved Shows:", savedShows);
        console.log("Is Public:", isPublic);
    }, [
        userProfile,
        spotifyUserId,
        topArtists,
        topSongs,
        topGenres,
        topAlbums,
        funFact,
        recentlyPlayed,
        savedShows,
        isPublic
    ]);

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
                    fun_fact: funFact,
                    recently_played: recentlyPlayed,
                    saved_shows: savedShows,
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

    // Function to make the wrap public
    const makeWrapPublic = () => {
        setIsPublic(true);
        alert("Your wrap is now public!");
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
            <div className="flex space-x-4">
                <button
                    onClick={saveWrap}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition"
                >
                    Save Wrap
                </button>
                <button
                    onClick={makeWrapPublic}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 transition"
                >
                    Make Public
                </button>
            </div>
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

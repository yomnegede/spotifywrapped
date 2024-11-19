import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext'; // Import the context

const ProfilePage = () => {
    const {
        userProfile,
        setUserProfile,
        spotifyUserId,
        setSpotifyUserId,
        topGenres,
        topArtists,
        setTopArtists,
        setTopSongs,
        setTopGenres,
        setTopAlbums,
        setFunFact,
        setRecentlyPlayed,
        setSavedShows
    } = useContext(SpotifyContext); // Use global state
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [dataFetched, setDataFetched] = useState(false); // State to ensure data is fetched only once
    const [description, setDescription] = useState(""); // State to store the description
    const [isGenerating, setIsGenerating] = useState(false); // State to handle the loading animation
    const navigate = useNavigate();

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // Function to fetch the description from the backend
    const getDescription = () => {
        setIsGenerating(true); // Start loading animation
        fetch('http://127.0.0.1:8000/api/get-description', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topGenres,
                topArtists
            })
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch description");
                return response.json();
            })
            .then(data => {
                setDescription(data.description);
                console.log("Description:", data.description);
            })
            .catch(error => {
                console.error("Error fetching description:", error);
            })
            .finally(() => {
                setIsGenerating(false); // Stop loading animation
            });
    };

    useEffect(() => {
        // Fetch the Spotify user profile and additional data if not already fetched
        const token = localStorage.getItem("spotify_access_token");
        setSpotifyUserId(token);

        if (token && !dataFetched) {
            // Fetch user profile
            fetch("https://api.spotify.com/v1/me", {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(response => response.json())
                .then(data => {
                    setUserProfile(data);
                    console.log("User Profile:", data);
                })
                .catch(error => console.error("Error fetching user profile:", error));

            // Fetch top artists
            fetch("https://api.spotify.com/v1/me/top/artists?limit=3&time_range=long_term", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch top artists");
                return response.json();
            })
            .then(data => {
                const artistData = data.items.map(artist => ({
                    name: artist.name,
                    imageUrl: artist.images[0]?.url || "https://via.placeholder.com/100"
                }));
                setTopArtists(artistData); // Use global setTopArtists
            })
            .catch(error => console.error("Error fetching top artists:", error));


            // Fetch top songs
            fetch("https://api.spotify.com/v1/me/top/tracks?limit=3&time_range=long_term", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch top songs");
                return response.json();
            })
            .then(data => {
                const songData = data.items.map(song => ({
                    title: song.name,
                    imageUrl: song.album.images[0]?.url || "https://via.placeholder.com/100"
                }));
                setTopSongs(songData);
            })
            .catch(error => console.error("Error fetching top songs:", error));

            // Fetch user's top artists and extract genres
            fetch("https://api.spotify.com/v1/me/top/artists?limit=20&time_range=long_term", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch top genres");
                return response.json();
            })
            .then(data => {
                const genreCounts = {};
                data.items.forEach(artist => {
                    artist.genres.forEach(genre => {
                        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                    });
                });
                // Sort and get the top 5 genres
                const sortedGenres = Object.entries(genreCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([genre]) => genre);
                setTopGenres(sortedGenres);
            })
            .catch(error => console.error("Error fetching top genres:", error));

            // fetch top albums
            fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch top albums");
                return response.json();
            })
            .then(data => {
                // Extract unique albums from the top tracks
                const albumMap = new Map();
                data.items.forEach(track => {
                    const album = track.album;
                    if (!albumMap.has(album.id)) {
                        albumMap.set(album.id, {
                            name: album.name,
                            imageUrl: album.images[0]?.url || "https://via.placeholder.com/100"
                        });
                    }
                });
                setTopAlbums(Array.from(albumMap.values()).slice(0, 3)); // Limit to top 3 albums
            })
            .catch(error => console.error("Error fetching top albums:", error));

            
            // fetch fun fact
            fetch("https://api.spotify.com/v1/me/top/artists?limit=5&time_range=long_term", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch fun fact data");
                return response.json();
            })
            .then(data => {
                if (data.items.length > 0) {
                    const artist = data.items[0].name;
                    const genres = data.items[0].genres.join(", ");
                    setFunFact(`Your top artist this year is ${artist}! You've explored genres like ${genres}.`);
                } else {
                    setFunFact("It looks like we couldn't find your top artist. Try listening to more music!");
                }
            })
            .catch(error => {
                console.error("Error fetching fun fact data:", error);
                setFunFact("Oops, something went wrong. Try refreshing the page.");
            });

            //fetch recently played tracks
            fetch("https://api.spotify.com/v1/me/player/recently-played?limit=5", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch recently played tracks");
                return response.json();
            })
            .then(data => {
                const trackData = data.items.map(item => ({
                    name: item.track.name,
                    artist: item.track.artists[0]?.name || "Unknown Artist",
                    imageUrl: item.track.album.images[0]?.url || "https://via.placeholder.com/100"
                }));
                setRecentlyPlayed(trackData);
            })
            .catch(error => console.error("Error fetching recently played tracks:", error));

            // fetch saved shows
            fetch("https://api.spotify.com/v1/me/shows?limit=5", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch saved shows");
                return response.json();
            })
            .then(data => {
                const showData = data.items.map(item => ({
                    name: item.show.name,
                    imageUrl: item.show.images[0]?.url || "https://via.placeholder.com/100"
                }));
                setSavedShows(showData);
            })
            .catch(error => console.error("Error fetching saved shows:", error));

            // Set dataFetched to true to prevent further requests

            setDataFetched(true);
        }
    }, [userProfile, setUserProfile, setSpotifyUserId, setTopArtists, setTopSongs, setRecentlyPlayed, setSavedShows, dataFetched]);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        setUserProfile(null);
        window.location.href = "/"; // Redirect to the landing page
    };

    const handleSpotifyWrapped = () => {
        navigate("/TopArtists");
    };

    const handleAboutUs = () => {
        navigate("/about");
    };

    return (
        <div className={`${isDarkMode ? 'bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#1DB954] text-white' : 'bg-gradient-to-br from-[#f0f4f8] via-[#dfe6ed] to-[#cbd5e0] text-black'} min-h-screen py-20 px-10 transition-colors duration-300`}>
            {/* Theme Toggle and About Us Buttons Container */}
            <div className="absolute top-10 right-10 flex space-x-4">
                {/* Theme Toggle Button */}
                <button
                    className="bg-green-500 text-white px-8 py-3 text-xl rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                {/* About Us Button */}
                <button
                    className="bg-blue-500 text-white px-8 py-3 text-xl rounded-full shadow-md hover:bg-blue-600 transition-transform duration-200 focus:outline-none"
                    onClick={handleAboutUs}
                >
                    About Us
                </button>
            </div>

            {/* Log Out Button */}
            <button
                className="absolute top-10 left-10 bg-red-600 text-white px-8 py-3 text-xl rounded-full shadow-md hover:bg-red-700 transition-transform duration-200 focus:outline-none"
                onClick={handleLogout}
            >
                Log out
            </button>

            {/* User Profile Section */}
            <div className="flex flex-col items-center">
                <h1 className="text-5xl font-extrabold mb-8">Your Spotify Profile</h1>
                <div className="bg-[#282828] text-white rounded-2xl p-10 shadow-2xl transform transition hover:scale-105 hover:shadow-3xl w-full max-w-3xl mb-8">
                    {userProfile ? (
                        <div className="text-center">
                            <h2 className="text-4xl font-bold mb-6">
                                Welcome, {userProfile.display_name}!
                            </h2>
                            {userProfile.images && userProfile.images.length > 0 && (
                                <img
                                    src={userProfile.images[0].url}
                                    alt="User Profile"
                                    className="w-40 h-40 rounded-full mb-8 mx-auto shadow-md border-4 border-green-500"
                                />
                            )}
                            <p className="text-2xl mb-4">Email: {userProfile.email}</p>
                            <p className="text-2xl mb-8">Country: {userProfile.country}</p>
                            {/* View Spotify Wrapped Button */}
                            <button
                                className="bg-green-500 text-white px-12 py-4 text-2xl rounded-full shadow-md hover:bg-green-600 transition duration-200 mb-6"
                                onClick={handleSpotifyWrapped}
                            >
                                View Spotify Wrapped
                            </button>
                            {/* Get Description Button */}
                            <button
                                className="bg-blue-500 text-white px-12 py-4 text-2xl rounded-full shadow-md hover:bg-blue-600 transition duration-200"
                                onClick={getDescription}
                            >
                                Get Description
                            </button>
                            {/* Display Loading Animation or Description */}
                            {isGenerating ? (
                                <p className="text-xl font-medium mt-6 animate-pulse">
                                    Generating your personalized description...
                                </p>
                            ) : (
                                description && (
                                    <p className="text-xl font-medium mt-6 bg-[#121212] p-6 rounded-xl shadow-lg">
                                        {description}
                                    </p>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="text-2xl font-semibold">Loading profile...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

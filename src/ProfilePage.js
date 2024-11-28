import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext'; // Import the context
import SavedShows from './SavedShows';

const ProfilePage = () => {
    const {
        userProfile,
        setUserProfile,
        spotifyUserId,
        setSpotifyUserId,
        topGenres,
        topArtists,
        topSongs,
        topAlbums,
        funFact,
        isPublic,
        recentlyPlayed,
        savedShows,
        playTopSongs,
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
    const [savedWraps, setSavedWraps] = useState([]); // State to store saved wraps

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


    const fetchSavedWraps = () => {
        if (userProfile) {
            fetch(`http://127.0.0.1:8000/api/get-user-wraps/${userProfile.display_name}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.wraps) setSavedWraps(data.wraps);
                })
                .catch((error) => console.error("Error fetching saved wraps:", error));
        }
    };

    const deleteWrap = (wrapId) => {
        fetch(`http://127.0.0.1:8000/api/delete-wrap/${wrapId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    setSavedWraps((prev) => prev.filter((wrap) => wrap.id !== wrapId));
                } else {
                    console.error("Error deleting wrap.");
                }
            })
            .catch((error) => console.error("Error deleting wrap:", error));
    };

    const deleteAccount = async (displayName) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/delete-wraps/${displayName}/`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Success:", data.message);
                alert(data.message); // Show a success message to the user
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                alert(errorData.error); // Show the error message to the user
            }
        } catch (error) {
            console.error("Error deleting wraps:", error);
            alert("An error occurred while deleting wraps. Please try again.");
        }
    };


    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete all wraps for ${userProfile.display_name}?`)) {
            deleteAccount(userProfile.display_name);
        }
    };

    const toggleVisibility = (wrapId, isPublic) => {
        fetch(`http://127.0.0.1:8000/api/update-wrap-visibility/${wrapId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_public: !isPublic }),
        })
            .then((response) => {
                if (response.ok) {
                    setSavedWraps((prev) =>
                        prev.map((wrap) =>
                            wrap.id === wrapId ? { ...wrap, is_public: !isPublic } : wrap
                        )
                    );
                } else {
                    console.error("Error updating visibility.");
                }
            })
            .catch((error) => console.error("Error updating visibility:", error));
    };



    useEffect(() => {
        // Fetch the Spotify user profile and additional data if not already fetched
        const token = localStorage.getItem("spotify_access_token");
        setSpotifyUserId(token);

        fetchSavedWraps();

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
            fetch("https://api.spotify.com/v1/me/top/artists?limit=9&time_range=long_term", {
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
            fetch("https://api.spotify.com/v1/me/top/tracks?limit=9&time_range=long_term", {
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
                    preview_url: song.preview_url,
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
                    .slice(0, 12)
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
                setTopAlbums(Array.from(albumMap.values()).slice(0, 6)); // Limit to top 3 albums
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
            fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
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
        console.log(spotifyUserId);
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
    };

    const handleAboutUs = () => {
        navigate("/about");
    };

    return (
        <div
            className={`${
                isDarkMode
                    ? 'bg-[#121212] text-white' // Dark mode: Spotify dark theme
                    : 'bg-[#f4f4f4] text-black' // Light mode: Spotify light accents
            } min-h-screen py-20 px-10 transition-colors duration-300`}
        >
            {/* Top Navigation Buttons */}
            <div className="absolute top-10 right-10 flex space-x-4">
                <button
                    className="border-2 border-green-500 text-green-500 px-8 py-3 text-xl rounded-full hover:bg-green-500 hover:text-white transition duration-200"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                    className="border-2 border-blue-500 text-blue-500 px-8 py-3 text-xl rounded-full hover:bg-blue-500 hover:text-white transition duration-200"
                    onClick={handleAboutUs}
                >
                    About Us
                </button>
            </div>
    
            {/* Logout Button */}
            <button
                className="absolute top-10 left-10 border-2 border-red-500 text-red-500 px-8 py-3 text-xl rounded-full hover:bg-red-500 hover:text-white transition duration-200"
                onClick={handleLogout}
            >
                Log out
            </button>
    
            {/* Profile Section */}
            <div className="flex flex-col items-center">
                <h1 className="text-6xl font-extrabold mb-16 border-b-4 border-green-500 pb-4">
                    Your Spotify Profile
                </h1>
    
                <div
                    className={`${
                        isDarkMode ? 'bg-[#282828]' : 'bg-white'
                    } shadow-xl rounded-2xl p-10 w-full max-w-4xl mb-12`}
                >
                    {userProfile ? (
                        <div className="text-center">
                            <h2 className="text-4xl font-bold mb-6">
                                Welcome, {userProfile.display_name}!
                            </h2>
                            {userProfile.images && userProfile.images.length > 0 && (
                                <img
                                    src={userProfile.images[0].url}
                                    alt="User Profile"
                                    className="w-36 h-36 rounded-full mx-auto mb-8 shadow-lg"
                                />
                            )}
                            <p className="text-2xl mb-4">
                                <strong>Email:</strong> {userProfile.email}
                            </p>
                            <p className="text-2xl mb-8">
                                <strong>Country:</strong> {userProfile.country}
                            </p>
    
                            {/* View Spotify Wrapped Button */}
                            <button
                                className="bg-green-500 text-white px-10 py-4 text-2xl rounded-full shadow-md hover:bg-green-600 transition duration-200"
                                onClick={() => {
                                    handleSpotifyWrapped();
                                    playTopSongs();
                                }}
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
                        <p className="text-2xl font-medium">Loading profile...</p>
                    )}
                </div>
    
                {/* Saved Wraps Section */}
                <div className="w-full max-w-6xl mt-10">
                    <h2 className="text-5xl font-semibold mb-10 border-b-2 border-gray-300 pb-4">
                        Your Saved Wraps
                    </h2>
                    {savedWraps.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {savedWraps.map((wrap) => (
                                <div
                                    key={wrap.id}
                                    className={`relative ${
                                        isDarkMode ? 'bg-[#1C1C1C] text-white' : 'bg-[#F9F9F9]'
                                    } text-black rounded-lg shadow-lg p-8 hover:shadow-xl transition-transform transform hover:-translate-y-2`}
                                >
                                    {/* Delete Wrap (Trash Icon) */}
                                    <button
                                        onClick={() => deleteWrap(wrap.id)}
                                        className="absolute top-2 left-2 text-red-600 hover:text-red-700 transition"
                                    >
                                        <img
                                            src="https://img.icons8.com/ios-glyphs/30/FF0000/trash--v1.png"
                                            alt="Delete Wrap"
                                        />
                                    </button>
    
                                    {/* Visibility Toggle */}
                                    <button
                                        onClick={() => toggleVisibility(wrap.id, wrap.is_public)}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-green-600 transition"
                                    >
                                        {wrap.is_public ? (
                                            <img
                                                src="https://img.icons8.com/ios-glyphs/30/FFFFFF/visible.png"
                                                alt="Public"
                                            />
                                        ) : (
                                            <img
                                                src="https://img.icons8.com/ios-glyphs/30/FFFFFF/invisible.png"
                                                alt="Private"
                                            />
                                        )}
                                    </button>
    
                                    {/* Wrap Content */}
                                    <div className="mt-6">
                                        <h3 className="text-2xl font-bold mb-2">
                                            {wrap.display_name}'s Wrap
                                        </h3>
                                        <p className="text-lg mb-6">
                                            <strong>Fun Fact:</strong> {wrap.fun_fact}
                                        </p>
                                        <button
                                            className="bg-green-500 text-white px-6 py-3 text-lg rounded-full hover:bg-green-600 transition"
                                            onClick={() => {
                                                console.log(wrap.spotify_user_id);
                                                navigate('/TopArtists', {
                                                    state: {
                                                        topArtists: wrap.top_artists,
                                                        topSongs: wrap.top_songs,
                                                        topGenres: wrap.top_genres,
                                                        topAlbums: wrap.top_albums,
                                                        funFact: wrap.fun_fact,
                                                        recentlyPlayed: wrap.recently_played,
                                                        userProfile: { display_name: wrap.display_name },
                                                        savedShows: wrap.saved_shows,
                                                        isPublic: wrap.is_public,
                                                        spotifyUserId: wrap.spotify_user_id,
                                                    },
                                                });
                                                playTopSongs();
                                            }}
                                            
                                        >
                                            View Spotify Wrapped
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-2xl text-center">You have no saved wraps yet.</p>
                    )}
                </div>
    
                <div className="flex flex-col items-center justify-start min-h-screen pt-10">
                    <button
                        onClick={() => {
                            navigate('/');
                            handleDelete();
                        }}
                        className="bg-red-500 text-white px-8 py-4 text-2xl rounded-lg hover:bg-red-600 transition"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
     
}   

export default ProfilePage;

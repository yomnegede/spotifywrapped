import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext'; // Import the context

const ProfilePage = () => {
    const { userProfile, setUserProfile, spotifyUserId, setSpotifyUserId } = useContext(SpotifyContext); // Use global state
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [publicWraps, setPublicWraps] = useState([]); // State for public wraps
    const navigate = useNavigate();

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    useEffect(() => {
        // Fetch the Spotify user profile
        const token = localStorage.getItem("spotify_access_token");
        setSpotifyUserId(token);
        if (token && !userProfile) {
            fetch("https://api.spotify.com/v1/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to fetch user profile");
                    return response.json();
                })
                .then(data => setUserProfile(data))
                .catch(error => console.error("Error fetching user profile:", error));
        }

        // Fetch all public wraps
        fetch('http://127.0.0.1:8000/api/get-public-wraps')
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch public wraps");
                return response.json();
            })
            .then(data => setPublicWraps(data.public_wraps))
            .catch(error => console.error("Error fetching public wraps:", error));
    }, [userProfile, setUserProfile]);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        setUserProfile(null);
        window.location.href = "/"; // Redirect to the landing page
    };

    const handleSpotifyWrapped = () => {
        navigate("/TopArtists"); // Navigate to the TopArtists page
    };

    const handleAboutUs = () => {
        navigate("/about"); // Navigate to the About Us page
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center justify-center min-h-screen p-5`}>
            {/* Log Out Button */}
            <button
                className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition"
                onClick={handleLogout}
            >
                Log out
            </button>

            {/* Theme Toggle and About Us Buttons */}
            <div className="absolute top-5 right-5 flex space-x-4">
                <button
                    className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-700 transition"
                    onClick={toggleTheme}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
                    onClick={handleAboutUs}
                >
                    About
                </button>
            </div>

            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Your Spotify Profile</h1>

            {/* User Profile Section */}
            <div className="bg-white text-black rounded-lg p-8 shadow-lg transform transition hover:scale-105 hover:shadow-2xl w-96 mb-10">
                {userProfile ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Welcome, {userProfile.display_name}!
                        </h2>
                        {userProfile.images && userProfile.images.length > 0 && (
                            <img
                                src={userProfile.images[0].url}
                                alt="User Profile"
                                className="w-32 h-32 rounded-full mb-6 mx-auto shadow-md"
                            />
                        )}
                        <p className="text-lg mb-2">Email: {userProfile.email}</p>
                        <p className="text-lg mb-6">Country: {userProfile.country}</p>
                        {/* View Spotify Wrapped Button */}
                        <button
                            className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                            onClick={handleSpotifyWrapped}
                        >
                            View Spotify Wrapped
                        </button>
                    </div>
                ) : (
                    <p className="text-lg">Loading profile...</p>
                )}
            </div>

            {/* Public Wraps Section */}
            <h2 className="text-3xl font-bold mb-4">Public Spotify Wraps</h2>
            <div className="space-y-4">
                {publicWraps.length > 0 ? (
                    publicWraps.map((wrap, index) => (
                        <div key={index} className="bg-white text-black rounded-lg p-6 shadow-lg w-full max-w-3xl">
                            <h3 className="text-2xl font-bold">{wrap.display_name}</h3>
                            <p className="text-sm text-gray-600 mb-2">Country: {wrap.country}</p>
                            <img
                                src={wrap.profile_image_url}
                                alt="Profile"
                                className="w-16 h-16 rounded-full mb-4"
                            />
                            <p className="mb-4">{wrap.fun_fact}</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={() => navigate(`/public-wrap/${wrap.spotify_user_id}`)} // Use the wrap ID
                            >
                                View Spotify Wrapped
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-lg">No public wraps available.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

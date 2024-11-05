import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const navigate = useNavigate(); // Hook for navigation

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    useEffect(() => {
        const token = localStorage.getItem("spotify_access_token");
        if (token) {
            // Fetch user profile information from Spotify
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
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        setUserProfile(null);
        window.location.href = "/"; // Redirect to the landing page
    };

    const handleSpotifyWrapped = () => {
        navigate("/TopArtists"); // Navigate to the TopArtists page
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center justify-center h-screen`}>
            {/* Log Out Button on the Top Left */}
            <button
                className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-full"
                onClick={handleLogout}
            >
                Log out
            </button>

            {/* Theme Toggle Switch */}
            <button
                className="absolute top-5 right-5 bg-purple-600 text-white px-4 py-2 rounded-full"
                onClick={toggleTheme}
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <h1 className="text-4xl font-bold mb-4">Your Spotify Profile</h1>
            
            <div className="border-4 border-purple-600 rounded-lg p-6 flex flex-col items-center bg-opacity-50">
                {userProfile ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Welcome, {userProfile.display_name}!
                        </h2>
                        {userProfile.images && userProfile.images.length > 0 && (
                            <img
                                src={userProfile.images[0].url}
                                alt="User Profile"
                                className="w-32 h-32 rounded-full mb-6"
                            />
                        )}
                        <p className="text-lg">Email: {userProfile.email}</p>
                        <p className="text-lg">Country: {userProfile.country}</p>
                        {/* View Spotify Wrapped Button */}
                        <button
                            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:opacity-80"
                            onClick={handleSpotifyWrapped}
                        >
                            View Spotify Wrapped
                        </button>
                    </div>
                ) : (
                    <p className="text-lg">Loading profile...</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

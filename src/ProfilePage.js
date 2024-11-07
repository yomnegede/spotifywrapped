import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const navigate = useNavigate();

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

    const handleAboutUs = () => {
        navigate("/about"); // Navigate to the About Us page
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center justify-center h-screen p-5`}>
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
            
            <div className="bg-white text-black rounded-lg p-8 shadow-lg transform transition hover:scale-105 hover:shadow-2xl w-96">
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
        </div>
    );
};

export default ProfilePage;

import React, { useEffect, useState } from 'react';
import spotifyImage from './images/spotify.png';
import { authUrl } from './config';

const LandingPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [userProfile, setUserProfile] = useState(null); // State for user profile

    useEffect(() => {
        // Clear the token on initial load to force login every time
        localStorage.removeItem("spotify_access_token");

        // Check if there's a token in localStorage in case of immediate re-login
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

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleSpotifyLogin = () => {
        // Redirect to Spotify's authorization URL
        window.location.href = authUrl;
    };

    const handleLogout = () => {
        // Clear token and reset user profile
        localStorage.removeItem("spotify_access_token");
        setUserProfile(null);
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center justify-center h-screen`}>
            {/* Theme Toggle Switch */}
            <button
                className="absolute top-5 right-5 bg-purple-600 text-white px-4 py-2 rounded-full"
                onClick={toggleTheme}
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <h1 className="text-3xl font-bold mb-4">Spotify Wrapped</h1>
            
            <div className="border-4 border-purple-600 rounded-lg p-6 flex flex-col items-center bg-opacity-50">
                <img src={spotifyImage} alt="Spotify Wrapped" className="w-48 mb-4" />
                
                {userProfile ? (
                    // Display user profile information if logged in
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">Welcome, {userProfile.display_name}!</h2>
                        {userProfile.images && userProfile.images.length > 0 && (
                            <img
                                src={userProfile.images[0].url}
                                alt="User Profile"
                                className="w-24 h-24 rounded-full mb-4"
                            />
                        )}
                        <p>Email: {userProfile.email}</p>
                        <p>Country: {userProfile.country}</p>
                        <button
                            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg text-lg hover:opacity-80"
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    // Show login button if not logged in
                    <div className="text-center">
                        <p className="text-lg mb-4">
                            Let's look at what you've been listening to this year!
                        </p>
                        <button
                            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg text-lg hover:opacity-80"
                            onClick={handleSpotifyLogin}
                        >
                            Log in with Spotify
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;

import React, { useEffect, useState } from 'react';
import PinkSpotifyLogo from './images/PinkSpotifyLogo.png';

const clientId = "your_actual_spotify_client_id";  // Replace with the actual client ID
const redirectUri = "http://localhost:3000/callback";  // Set to your callback URL
const scopes = "user-read-private user-read-email";  // Required scopes

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;

const LandingPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const hash = window.location.hash;
        let token = localStorage.getItem("spotify_access_token");

        if (!token && hash) {
            token = new URLSearchParams(hash.replace('#', '?')).get('access_token');
            if (token) {
                localStorage.setItem("spotify_access_token", token);
                window.location.hash = "";  // Clear the URL hash
            }
        }

        if (token) {
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
        window.location.href = authUrl;
    };

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        setUserProfile(null);
    };

    return (
        <div className={`relative ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#D3FD70] text-black'} h-screen flex flex-col items-center`}>
            <style>
                {`
                    @keyframes verticalMarquee {
                        0% { transform: translateY(100%); }
                        100% { transform: translateY(-100%); }
                    }

                    .animate-verticalMarquee {
                        display: flex;
                        flex-direction: column;
                        animation: verticalMarquee 80s linear infinite;
                        gap: 2rem;
                    }
                `}
            </style>

            <div className="absolute top-5 left-5 flex items-center space-x-4">
                <img src={PinkSpotifyLogo} alt="Spotify" className="w-16 h-16" />
                <h1 className="text-3xl font-bold text-[#FF97DA]">Spotify</h1>
                <button className="bg-[#FE7CD0] text-black px-4 py-2 rounded-full font-bold" onClick={toggleTheme}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button 
                    className="bg-[#FE7CD0] text-black px-4 py-2 rounded-full font-bold" 
                    onClick={userProfile ? handleLogout : handleSpotifyLogin}
                >
                    {userProfile ? 'Log Out' : 'Log In with Spotify'}
                </button>
            </div>

            {/* Continuously scrolling "Wrapped" text from bottom to top, slightly aligned to the right */}
            <div className="absolute bottom-0 w-full overflow-hidden h-screen flex items-center justify-end pr-4 pointer-events-none">
                <div className="animate-verticalMarquee flex flex-col items-center">
                    {Array(100).fill().map((_, index) => (
                        <h1 
                            key={`first-${index}`} 
                            className="font-bold" 
                            style={{ fontSize: '8vw', color: index % 2 === 0 ? '#000' : '#FF97DA', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                        >
                            Wrapped
                        </h1>
                    ))}
                    {Array(100).fill().map((_, index) => (
                        <h1 
                            key={`second-${index}`} 
                            className="font-bold" 
                            style={{ fontSize: '8vw', color: index % 2 === 0 ? '#000' : '#FF97DA', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                        >
                            Wrapped
                        </h1>
                    ))}
                </div>
            </div>

            {userProfile && (
                <div className={`absolute top-20 right-20 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg text-center shadow-lg`}>
                    <h2 className="text-2xl font-semibold mb-2">Welcome, {userProfile.display_name}!</h2>
                    {userProfile.images && userProfile.images.length > 0 && (
                        <img
                            src={userProfile.images[0].url}
                            alt="User Profile"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                    )}
                    <p>Email: {userProfile.email}</p>
                    <p>Country: {userProfile.country}</p>
                </div>
            )}
        </div>
    );
};

export default LandingPage;

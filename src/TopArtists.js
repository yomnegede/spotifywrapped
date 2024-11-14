import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext'; // Import the context

const TopArtists = () => {
    const navigate = useNavigate();
    const { topArtists, setTopArtists } = useContext(SpotifyContext); // Use global state

    useEffect(() => {
        const token = localStorage.getItem("spotify_access_token");
        if (token && topArtists.length === 0) { // Fetch only if topArtists is empty
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
        }
    }, [topArtists, setTopArtists]); // Add dependencies

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        navigate('/'); // Redirect to the landing page
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-500 to-pink-600 p-5">
            {/* Log Out Button on the Top Left */}
            <button 
                onClick={handleLogout} 
                className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-full"
            >
                Log out
            </button>

            {/* Profile Button on the Top Right */}
            <button
                onClick={() => navigate('/profile')}
                className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
                <img 
                    src="https://img.icons8.com/ios-glyphs/30/000000/user.png" 
                    alt="Profile" 
                    className="w-6 h-6"
                />
            </button>

            <h1 className="text-5xl text-white mb-10 font-bold drop-shadow-lg">Top Artists</h1>
            {topArtists.length > 0 ? (
                topArtists.map((artist, index) => (
                    <div 
                        key={index} 
                        className="flex items-center bg-white rounded-lg p-6 mb-6 w-96 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <img 
                            src={artist.imageUrl} 
                            alt={artist.name} 
                            className="w-20 h-20 rounded-full mr-6"
                        />
                        <p className="text-2xl font-semibold">{artist.name}</p>
                    </div>
                ))
            ) : (
                <p className="text-white text-lg">Loading top artists...</p>
            )}
            <button 
                onClick={() => navigate('/TopSongs')} 
                className="mt-8 bg-white text-pink-600 px-8 py-3 rounded-lg text-xl hover:bg-pink-600 hover:text-white transition"
            >
                Next
            </button>
        </div>
    );
};

export default TopArtists;

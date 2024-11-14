import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext'; // Import the context

const TopSongs = () => {
    const navigate = useNavigate();
    const {topSongs, setTopSongs} = useContext(SpotifyContext); // State to hold top songs

    useEffect(() => {
        const token = localStorage.getItem("spotify_access_token");
        if (token) {
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
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        navigate('/'); // Redirect to the landing page
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-5">
            <button 
                onClick={handleLogout} 
                className="absolute top-5 left-5 bg-blue-600 text-white px-4 py-2 rounded-full"
            >
                Log out
            </button>
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
            <h1 className="text-5xl text-white mb-10 font-bold drop-shadow-lg">Top Songs</h1>
            {topSongs.length > 0 ? (
                topSongs.map((song, index) => (
                    <div 
                        key={index} 
                        className="flex items-center bg-white rounded-lg p-6 mb-6 w-96 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <img 
                            src={song.imageUrl} 
                            alt={song.title} 
                            className="w-20 h-20 rounded-full mr-6"
                        />
                        <p className="text-2xl font-semibold">{song.title}</p>
                    </div>
                ))
            ) : (
                <p className="text-white text-lg">Loading top songs...</p>
            )}
            <div className="flex space-x-4 mt-8">
                <button 
                    onClick={() => navigate('/TopArtists')} 
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg text-xl hover:bg-blue-600 hover:text-white transition"
                >
                    Back
                </button>
                <button 
                    onClick={() => navigate('/TopGenres')} 
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg text-xl hover:bg-blue-600 hover:text-white transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TopSongs;

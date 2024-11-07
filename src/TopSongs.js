import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import wrapperImage from './images/wrapper.png';

const TopSongs = () => {
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]); 

    useEffect(() => {
        const token = localStorage.getItem("spotify_access_token");
        if (token) {
            fetch("https://api.spotify.com/v1/me/top/tracks?limit=6&time_range=long_term", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch top songs");
                return response.json();
            })
            .then(data => {
                const songData = data.items.map((song, index) => ({
                    rank: index + 1,
                    title: song.name,
                    artist: song.artists.map(artist => artist.name).join(", "),
                    imageUrl: song.album.images[0]?.url || "https://via.placeholder.com/100"
                }));
                setSongs(songData);
            })
            .catch(error => console.error("Error fetching top songs:", error));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        navigate('/'); 
    };

    return (
        <div className="relative flex flex-col items-center h-screen bg-[#b6e368] p-5 text-center font-sans overflow-hidden">
            {/* Background Images in Top Left and Bottom Right Corners */}
            <img src={wrapperImage} alt="Background decoration" className="absolute top-0 left-0 w-69 h-48" />
            <img src={wrapperImage} alt="Background decoration" className="absolute bottom-0 right-0 w-90 h-64 transform rotate-[180deg]" />

            {/* Log Out Button */}
            <button 
                onClick={handleLogout} 
                className="absolute top-5 left-5 bg-red-600 text-white px-5 py-3 rounded-full text-lg"
            >
                Log out
            </button>

            {/* Profile Button */}
            <button
                onClick={() => navigate('/profile')}
                className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition"
            >
                <img 
                    src="https://img.icons8.com/ios-glyphs/30/000000/user.png" 
                    alt="Profile" 
                    className="w-8 h-8"
                />
            </button>

            {/* Title */}
            <h1 className="text-5xl font-bold text-black mb-8">My Top Songs</h1>

            {/* Songs Grid */}
            <div className="grid grid-cols-2 gap-12 justify-items-center mx-auto w-[80%] mt-20">
                <div className="space-y-12">
                    {songs.slice(0, 3).map((song) => (
                        <div key={song.rank} className="flex items-center space-x-8">
                            <p className="text-7xl font-extrabold text-black">#{song.rank}</p>
                            <img 
                                src={song.imageUrl} 
                                alt={song.title} 
                                className="w-40 h-40 shadow-md transition-transform transform hover:scale-110"
                            />
                            <div className="text-left">
                                <p className="text-3xl font-semibold">{song.title}</p>
                                <p className="text-2xl text-black">{song.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="space-y-12">
                    {songs.slice(3, 6).map((song) => (
                        <div key={song.rank} className="flex items-center space-x-8">
                            <p className="text-7xl font-extrabold text-black">#{song.rank}</p>
                            <img 
                                src={song.imageUrl} 
                                alt={song.title} 
                                className="w-40 h-40 shadow-md transition-transform transform hover:scale-110"
                            />
                            <div className="text-left">
                                <p className="text-3xl font-semibold">{song.title}</p>
                                <p className="text-2xl text-black">{song.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Centered Back Button at the Bottom */}
            <button 
                onClick={() => navigate('/TopArtists')}
                className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-purple-800 px-8 py-3 rounded-lg text-xl hover:bg-purple-800 hover:text-white transition"
            >
                Back to Top Artists
            </button>

            {/* Spotify Logo and Hashtag with Matched Sizes */}
            <div className="absolute bottom-5 left-5 flex items-center space-x-12">
                <div className="flex items-center space-x-2">
                    <img src="https://img.icons8.com/ios-glyphs/40/000000/spotify.png" alt="Spotify logo" className="w-11 h-11" />
                    <span className="text-black font-bold text-lg">Spotify</span>
                </div>
                <span className="text-black font-semibold text-lg">#SPOTIFYWRAPPED</span>
            </div>
        </div>
    );
};

export default TopSongs;

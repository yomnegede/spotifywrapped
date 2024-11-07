import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import note1 from './images/note1.png';
import note2 from './images/note2.png';
import note3 from './images/note3.png';
import spotifyLogo from './images/black_spotify.png';

const TopArtists = () => {
    const navigate = useNavigate();
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopArtists = async () => {
            const token = localStorage.getItem("spotify_access_token");
            if (token) {
                try {
                    const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=5&time_range=long_term", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (!response.ok) throw new Error("Failed to fetch top artists");
                    const data = await response.json();
                    const artistData = data.items.map(artist => ({
                        name: artist.name,
                        imageUrl: artist.images[0]?.url || "https://via.placeholder.com/100"
                    }));
                    setArtists(artistData);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching top artists:", error);
                }
            } else {
                console.warn("No access token found in localStorage.");
            }
        };

        fetchTopArtists();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        navigate('/'); 
    };

    return (
        <div className="relative flex flex-col items-center h-screen bg-gradient-to-b from-purple-600 to-purple-500 p-5 text-center font-sans">
            {/* Log Out Button */}
            <button 
                onClick={handleLogout} 
                className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-full"
            >
                Log out
            </button>

            {/* Profile Button */}
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

            {/* Title with adjusted margin-top */}
            <h1 className="text-5xl font-extrabold text-lime-300 mt-2 mb-5 drop-shadow-lg">My Top Artists</h1>

            {/* Centered Top Artist Image with Fade-in Animation and Notes */}
            <div className="relative flex flex-col items-center mt-6 mb-2">
                {artists[0] && (
                    <img 
                        src={artists[0].imageUrl} 
                        alt={artists[0].name} 
                        className="w-60 h-60 mb-1 shadow-lg object-cover rounded-lg relative z-10 animate-fadeIn"
                    />
                )}
                {/* Musical Notes Positioned to the Left and Right of the Image with Wider Spacing */}
                <img src={note1} alt="note1" className="absolute w-10 h-10 top-4 left-[-7rem] animate-bounce-rotate z-20" />
                <img src={note2} alt="note2" className="absolute w-10 h-10 top-24 left-[-8rem] animate-bounce-rotate z-20" />
                <img src={note3} alt="note3" className="absolute w-10 h-10 top-44 left-[-7rem] animate-bounce-rotate z-20" />
                
                <img src={note1} alt="note1" className="absolute w-10 h-10 top-4 right-[-7rem] animate-bounce-rotate z-20" />
                <img src={note2} alt="note2" className="absolute w-10 h-10 top-24 right-[-8rem] animate-bounce-rotate z-20" />
                <img src={note3} alt="note3" className="absolute w-10 h-10 top-44 right-[-7rem] animate-bounce-rotate z-20" />
            </div>

            {/* Pyramid Structure with Smooth Drop Animation */}
            {loading ? (
                <p className="text-white text-lg mt-10 animate-drop">Loading top artists...</p>
            ) : (
                artists.length > 0 && (
                    <div className="flex flex-col items-center mt-2 mb-8">
                        {artists[0] && (
                            <div className="flex flex-col items-center bg-[#ff7fd3] text-black font-sans font-bold rounded-2xl p-8 w-[40rem] shadow-lg animate-fall">
                                <p className="text-2xl">1. {artists[0].name}</p>
                            </div>
                        )}
                        {artists[1] && (
                            <div className="flex flex-col items-center bg-[#ff9fe8] text-black font-sans font-bold rounded-2xl p-8 w-[55rem] shadow-lg animate-fall" style={{ animationDelay: '0.1s' }}>
                                <p className="text-xl">2. {artists[1].name}</p>
                            </div>
                        )}
                        {artists[2] && (
                            <div className="flex flex-col items-center bg-[#ffafea] text-black font-sans font-bold rounded-2xl p-8 w-[65rem] shadow-lg animate-fall" style={{ animationDelay: '0.2s' }}>
                                <p className="text-lg">3. {artists[2].name}</p>
                            </div>
                        )}
                        {artists[3] && (
                            <div className="flex flex-col items-center bg-[#ffbfed] text-black font-sans font-bold rounded-2xl p-8 w-[75rem] shadow-lg animate-fall" style={{ animationDelay: '0.3s' }}>
                                <p className="text-lg">4. {artists[3].name}</p>
                            </div>
                        )}
                        {artists[4] && (
                            <div className="flex flex-col items-center bg-[#ffcfee] text-black font-sans font-bold rounded-2xl p-8 w-[85rem] shadow-lg animate-fall" style={{ animationDelay: '0.4s' }}>
                                <p className="text-lg">5. {artists[4].name}</p>
                            </div>
                        )}
                    </div>
                )
            )}

            {/* Next Button positioned below the pyramid */}
            <button 
                onClick={() => navigate('/TopSongs')} 
                className="mt-8 bg-white text-purple-800 px-8 py-3 rounded-lg text-xl hover:bg-purple-800 hover:text-white transition"
            >
                Next
            </button>

            {/* Spotify Logo, Text, and Hashtag at Bottom Left with Increased Spacing */}
            <div className="absolute bottom-5 left-5 flex items-center space-x-10">
                <div className="flex items-center space-x-2">
                    <img src={spotifyLogo} alt="Spotify logo" className="w-10 h-10" />
                    <span className="text-black font-bold text-lg">Spotify</span>
                </div>
                <span className="text-black font-semibold text-lg">#SPOTIFYWRAPPED</span>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 1.5s ease-in-out forwards;
                }
                @keyframes drop {
                    0% {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
                .animate-drop {
                    animation: drop 1.5s ease-out forwards;
                }
                @keyframes bounce-rotate {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(15deg);
                    }
                }
                .animate-bounce-rotate {
                    animation: bounce-rotate 2s infinite;
                }
                @keyframes fall {
                    0% {
                        transform: translateY(-50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-fall {
                    animation: fall 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default TopArtists;

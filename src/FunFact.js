import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const FunFact = () => {
    const navigate = useNavigate();
    const {funFact,setFunFact} = useContext(SpotifyContext);

    useEffect(() => {
        const token = localStorage.getItem("spotify_access_token");
        if (token) {
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
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        navigate('/');
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-teal-400 to-teal-600 p-5">
            <button onClick={handleLogout} className="absolute top-5 left-5 bg-teal-600 text-white px-4 py-2 rounded-full">
                Log out
            </button>
            <button onClick={() => navigate('/profile')} className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/user.png" alt="Profile" className="w-6 h-6" />
            </button>
            <h1 className="text-5xl text-white mb-10 font-bold drop-shadow-lg">Fun Fact</h1>
            <p className="text-3xl text-white text-center mb-6">{funFact}</p>
            <div className="flex space-x-4 mt-8">
                <button onClick={() => navigate('/TopAlbums')} className="bg-white text-teal-600 px-8 py-3 rounded-lg text-xl hover:bg-teal-600 hover:text-white transition">
                    Back
                </button>
                <button onClick={() => navigate('/RecentlyPlayedTracks')} className="bg-white text-teal-600 px-8 py-3 rounded-lg text-xl hover:bg-teal-600 hover:text-white transition">
                    Next
                </button>
            </div>
        </div>
    );
};

export default FunFact;

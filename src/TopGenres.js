import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopGenres = () => {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("spotify_access_token");
        if (token) {
            // Fetch user's top artists and extract genres
            fetch("https://api.spotify.com/v1/me/top/artists?limit=20&time_range=long_term", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch top genres");
                return response.json();
            })
            .then(data => {
                const genreCounts = {};
                data.items.forEach(artist => {
                    artist.genres.forEach(genre => {
                        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                    });
                });
                // Sort and get the top 5 genres
                const sortedGenres = Object.entries(genreCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([genre]) => genre);
                setGenres(sortedGenres);
            })
            .catch(error => console.error("Error fetching top genres:", error));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        navigate('/');
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-400 to-green-600 p-5">
            <button onClick={handleLogout} className="absolute top-5 left-5 bg-green-600 text-white px-4 py-2 rounded-full">
                Log out
            </button>
            <button onClick={() => navigate('/profile')} className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/user.png" alt="Profile" className="w-6 h-6" />
            </button>
            <h1 className="text-5xl text-white mb-10 font-bold drop-shadow-lg">Top Genres</h1>
            {genres.length > 0 ? (
                genres.map((genre, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-white rounded-lg p-6 mb-6 w-96 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <p className="text-2xl font-semibold text-center w-full">{genre}</p>
                    </div>
                ))
            ) : (
                <p className="text-white text-lg">Loading top genres...</p>
            )}
            <div className="flex space-x-4 mt-8">
                <button onClick={() => navigate('/TopSongs')} className="bg-white text-green-600 px-8 py-3 rounded-lg text-xl hover:bg-green-600 hover:text-white transition">
                    Back
                </button>
                <button onClick={() => navigate('/TopAlbums')} className="bg-white text-green-600 px-8 py-3 rounded-lg text-xl hover:bg-green-600 hover:text-white transition">
                    Next
                </button>
            </div>
        </div>
    );
};

export default TopGenres;

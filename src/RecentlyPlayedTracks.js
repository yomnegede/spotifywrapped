import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyContext from './SpotifyContext';

const RecentlyPlayedTracks = () => {
    const navigate = useNavigate();
    const {recentlyPlayed}= useContext(SpotifyContext);

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        navigate('/');
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-5">
            <button onClick={handleLogout} className="absolute top-5 left-5 bg-blue-600 text-white px-4 py-2 rounded-full">
                Log out
            </button>
            <button onClick={() => navigate('/profile')} className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/user.png" alt="Profile" className="w-6 h-6" />
            </button>
            <h1 className="text-5xl text-white mb-10 font-bold drop-shadow-lg">Recently Played Tracks</h1>
            {recentlyPlayed.length > 0 ? (
                recentlyPlayed.map((track, index) => (
                    <div key={index} className="flex items-center bg-white rounded-lg p-6 mb-6 w-96 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
                        <img src={track.imageUrl} alt={track.name} className="w-20 h-20 rounded-full mr-6" />
                        <div>
                            <p className="text-2xl font-semibold">{track.name}</p>
                            <p className="text-lg text-gray-600">{track.artist}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-white text-lg">Loading recently played tracks...</p>
            )}
            <div className="flex space-x-4 mt-8">
                <button onClick={() => navigate('/FunFact')} className="bg-white text-blue-600 px-8 py-3 rounded-lg text-xl hover:bg-blue-600 hover:text-white transition">
                    Back
                </button>
                <button onClick={() => navigate('/SavedShows')} className="bg-white text-blue-600 px-8 py-3 rounded-lg text-xl hover:bg-blue-600 hover:text-white transition">
                    Next
                </button>
            </div>
        </div>
    );
};

export default RecentlyPlayedTracks;

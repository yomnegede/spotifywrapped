import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PublicWrappedPage = () => {
    const { wrapId } = useParams();
    const [wrapData, setWrapData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/get-wrap/${wrapId}`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch wrap data");
                return response.json();
            })
            .then(data => {
                setWrapData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching wrap data:", error);
                setIsLoading(false);
            });
    }, [wrapId]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    if (isLoading) {
        return <p className="text-center text-2xl font-semibold mt-20">Loading wrap data...</p>;
    }

    if (!wrapData) {
        return <p className="text-center text-2xl font-semibold mt-20">Wrap data not found.</p>;
    }

    return (
        <div className={`${isDarkMode ? 'bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#1DB954] text-white' : 'bg-gradient-to-br from-[#f0f4f8] via-[#dfe6ed] to-[#cbd5e0] text-black'} min-h-screen py-20 px-10 transition-colors duration-300`}>
            {/* Theme Toggle */}
            <button
                className="absolute top-10 right-10 bg-green-500 text-white px-8 py-3 text-xl rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
                onClick={toggleTheme}
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* User Information Section */}
            <div className="flex flex-col items-center mb-16">
                <img
                    src={wrapData.profile_image_url}
                    alt="Profile"
                    className="w-44 h-44 rounded-full shadow-xl border-4 border-green-500 mb-6"
                />
                <h1 className="text-5xl font-extrabold mb-4">Spotify Wrapped for {wrapData.display_name}</h1>
                <p 
                className={`text-[1vw] font-medium mt-[1.5vh] p-[1.5vw] rounded-lg shadow-md ${
                    isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#f4f4f4] text-black'
                }`}
                >
                    Fun Fact: {wrapData.fun_fact}
                </p>
            </div>

            {/* Top Artists */}
            <h2 className="text-4xl font-bold mb-6">Top Artists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                {wrapData.top_artists.map((artist, index) => (
                    <div key={index} className="bg-[#282828] text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
                        <img
                            src={artist.imageUrl}
                            alt={artist.name}
                            className="w-24 h-24 rounded-full mb-4 mx-auto"
                        />
                        <p className="text-lg font-bold text-center">{artist.name}</p>
                    </div>
                ))}
            </div>

            {/* Top Songs */}
            <h2 className="text-4xl font-bold mb-6">Top Songs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                {wrapData.top_songs.map((song, index) => (
                    <div key={index} className="bg-[#282828] text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
                        <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="w-24 h-24 rounded-full mb-4 mx-auto"
                        />
                        <p className="text-lg font-bold text-center">{song.title}</p>
                    </div>
                ))}
            </div>

            {/* Top Genres as Cards */}
            <h2 className="text-4xl font-bold mb-6">Top Genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                {wrapData.top_genres.map((genre, index) => (
                    <div key={index} className="bg-[#282828] text-white px-6 py-4 rounded-2xl shadow-md text-lg font-semibold text-center transform hover:scale-105 transition duration-300">
                        {genre}
                    </div>
                ))}
            </div>

            {/* Top Albums */}
            <h2 className="text-4xl font-bold mb-6">Top Albums</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                {wrapData.top_albums.map((album, index) => (
                    <div key={index} className="bg-[#282828] text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
                        <img
                            src={album.imageUrl}
                            alt={album.name}
                            className="w-24 h-24 rounded-full mb-4 mx-auto"
                        />
                        <p className="text-lg font-bold text-center">{album.name}</p>
                    </div>
                ))}
            </div>

            {/* Recently Played */}
            <h2 className="text-4xl font-bold mb-6">Recently Played</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                {wrapData.recently_played.map((track, index) => (
                    <div key={index} className="bg-[#282828] text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
                        <img
                            src={track.imageUrl}
                            alt={track.name}
                            className="w-24 h-24 rounded-full mb-4 mx-auto"
                        />
                        <p className="text-lg font-bold text-center">{track.name}</p>
                        <p className="text-sm text-gray-400 text-center">{track.artist}</p>
                    </div>
                ))}
            </div>

            {/* Saved Shows */}
            {wrapData.saved_shows.length > 0 && (
                <>
                    <h2 className="text-4xl font-bold mb-6">Saved Shows</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
                        {wrapData.saved_shows.map((show, index) => (
                            <div key={index} className="bg-[#282828] text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
                                <img
                                    src={show.imageUrl}
                                    alt={show.name}
                                    className="w-24 h-24 rounded-full mb-4 mx-auto"
                                />
                                <p className="text-lg font-bold text-center">{show.name}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PublicWrappedPage;

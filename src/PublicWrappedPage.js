// PublicWrappedPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PublicWrappedPage = () => {
    const { wrapId } = useParams();
    const [wrapData, setWrapData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/get-public-wrap/${wrapId}`)
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

    if (isLoading) {
        return <p>Loading wrap data...</p>;
    }

    if (!wrapData) {
        return <p>Wrap data not found.</p>;
    }

    return (
        <div className="min-h-screen p-10 bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-center">Spotify Wrapped for {wrapData.display_name}</h1>
            <div className="flex items-center justify-start mb-10">
                <img
                    src={wrapData.profile_image_url}
                    alt="Profile"
                    className="w-40 h-40 rounded-full mr-6"
                />
                <div>
                    <p className="text-lg mb-2">Country: {wrapData.country}</p>
                    <p className="text-lg">Fun Fact: {wrapData.fun_fact}</p>
                </div>
            </div>

            {/* Top Artists */}
            <h2 className="text-2xl font-semibold mb-4">Top Artists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                {wrapData.top_artists.map((artist, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                        <img
                            src={artist.imageUrl}
                            alt={artist.name}
                            className="w-20 h-20 rounded-full mb-2 mx-auto"
                        />
                        <p className="font-bold">{artist.name}</p>
                    </div>
                ))}
            </div>

            {/* Top Songs */}
            <h2 className="text-2xl font-semibold mb-4">Top Songs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                {wrapData.top_songs.map((song, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                        <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="w-20 h-20 rounded-full mb-2 mx-auto"
                        />
                        <p className="font-bold">{song.title}</p>
                    </div>
                ))}
            </div>

            {/* Top Genres */}
            <h2 className="text-2xl font-semibold mb-4">Top Genres</h2>
            <div className="flex flex-wrap gap-4 mb-10">
                {wrapData.top_genres.map((genre, index) => (
                    <span key={index} className="bg-white p-2 rounded-lg shadow-md text-sm font-semibold">
                        {genre}
                    </span>
                ))}
            </div>

            {/* Top Albums */}
            <h2 className="text-2xl font-semibold mb-4">Top Albums</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                {wrapData.top_albums.map((album, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                        <img
                            src={album.imageUrl}
                            alt={album.name}
                            className="w-20 h-20 rounded-full mb-2 mx-auto"
                        />
                        <p className="font-bold">{album.name}</p>
                    </div>
                ))}
            </div>

            {/* Recently Played */}
            <h2 className="text-2xl font-semibold mb-4">Recently Played</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                {wrapData.recently_played.map((track, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                        <img
                            src={track.imageUrl}
                            alt={track.name}
                            className="w-20 h-20 rounded-full mb-2 mx-auto"
                        />
                        <p className="font-bold">{track.name}</p>
                        <p className="text-sm">{track.artist}</p>
                    </div>
                ))}
            </div>

            {/* Saved Shows */}
            {wrapData.saved_shows.length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">Saved Shows</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                        {wrapData.saved_shows.map((show, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                                <img
                                    src={show.imageUrl}
                                    alt={show.name}
                                    className="w-20 h-20 rounded-full mb-2 mx-auto"
                                />
                                <p className="font-bold">{show.name}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PublicWrappedPage;

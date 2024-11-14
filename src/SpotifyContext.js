import React, { createContext, useState } from 'react';

// Create the context
const SpotifyContext = createContext();

// Create the provider component
export const SpotifyProvider = ({ children }) => {
    // State to store user and Wrapped data
    const [userProfile, setUserProfile] = useState(null);
    const [spotifyUserId, setSpotifyUserId] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [funFact, setFunFact] = useState("");
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [savedShows, setSavedShows] = useState([]);
    const [isPublic, setIsPublic] = useState(false);

    return (
        <SpotifyContext.Provider
            value={{
                userProfile,
                setUserProfile,
                spotifyUserId,
                setSpotifyUserId,
                topArtists,
                setTopArtists,
                topSongs,
                setTopSongs,
                topGenres,
                setTopGenres,
                topAlbums,
                setTopAlbums,
                funFact,
                setFunFact,
                recentlyPlayed,
                setRecentlyPlayed,
                savedShows,
                setSavedShows,
                isPublic,
                setIsPublic,
            }}
        >
            {children}
        </SpotifyContext.Provider>
    );
};

export default SpotifyContext;

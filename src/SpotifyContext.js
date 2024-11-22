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

    const [audio, setAudio] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);

    const playTopSongs = () => {
        if (topSongs.length > 0) {
            if (audio) {
                audio.pause();
            }

            const updatedTopSongs = [...topSongs.slice(1), topSongs[0]];
            setTopSongs(updatedTopSongs);

            const nextTrack = updatedTopSongs[0];
            if (nextTrack?.preview_url) {
                const newAudio = new Audio(nextTrack.preview_url);
                newAudio.play();
                setAudio(newAudio);
                setCurrentTrack(nextTrack);
            } else {
                console.log("No preview available for the next track.");
            }
        } else {
            console.log("No top songs to play.");
        }
    };

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
                playTopSongs,
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

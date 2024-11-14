import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SpotifyProvider } from './SpotifyContext'; // Import the context provider
import LandingPage from './LandingPage';
import TopArtists from './TopArtists';
import TopSongs from './TopSongs';
import SpotifyCallback from './SpotifyCallback';
import ProfilePage from './ProfilePage';
import TopGenres from './TopGenres';
import TopAlbums from './TopAlbums';
import FunFact from './FunFact';
import RecentlyPlayedTracks from './RecentlyPlayedTracks';
import SavedShows from './SavedShows';
import ThankYou from './ThankYou';
import AboutUs from './AboutUs';
import PublicWrappedPage from './PublicWrappedPage';

function App() {
    return (
        <SpotifyProvider> {/* Wrap the entire application with the SpotifyProvider */}
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/TopArtists" element={<TopArtists />} />
                    <Route path="/TopSongs" element={<TopSongs />} />
                    <Route path="/TopGenres" element={<TopGenres />} />
                    <Route path="/TopAlbums" element={<TopAlbums />} />
                    <Route path="/FunFact" element={<FunFact />} />
                    <Route path="/RecentlyPlayedTracks" element={<RecentlyPlayedTracks />} />
                    <Route path="/SavedShows" element={<SavedShows />} />
                    <Route path="/ThankYou" element={<ThankYou />} />
                    <Route path="/callback" element={<SpotifyCallback />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/about" element={<AboutUs />} /> 
                    <Route path="/public-wrap/:wrapId" element={<PublicWrappedPage />} />
                </Routes>
            </Router>
        </SpotifyProvider>
    );
}

export default App;

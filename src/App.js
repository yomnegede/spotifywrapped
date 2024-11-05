import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import TopArtists from './TopArtists';
import TopSongs from './TopSongs';
import SpotifyCallback from './SpotifyCallback';
import ProfilePage from './ProfilePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/TopArtists" element={<TopArtists />} />
                <Route path="/callback" element={<SpotifyCallback />} />
                <Route path="/TopSongs" element={<TopSongs />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;


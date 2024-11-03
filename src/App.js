import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import TopArtists from './TopArtists';
import SpotifyCallback from './SpotifyCallback';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/TopArtists" element={<TopArtists />} />
                <Route path="/callback" element={<SpotifyCallback />} />
            </Routes>
        </Router>
    );
}

export default App;


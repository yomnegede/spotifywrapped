import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Extract the authorization code from the URL
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");

        if (code) {
            // Send the code to your backend server to exchange for an access token
            fetch("/api/spotify-auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })
            })
            .then(response => response.json())
            .then(data => {
                if (data.access_token) {
                    // Save the token in local storage or context (depending on your setup)
                    localStorage.setItem("spotify_access_token", data.access_token);
                    navigate("/"); // Redirect back to the main page or dashboard
                }
            })
            .catch(error => console.error("Error exchanging code for token:", error));
        }
    }, [navigate]);

    return <div>Logging you in...</div>;
};

export default SpotifyCallback;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");

        if (code) {
            fetch("http://127.0.0.1:8000/api/spotify-auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data.access_token) {
                    // Store the access token in localStorage
                    localStorage.setItem("spotify_access_token", data.access_token);
                    console.log("Access token stored:", data.access_token);
                    navigate("/profile"); // Redirect to ProfilePage after successful login
                } else {
                    console.error("No access token received in response");
                }
            })
            .catch(error => {
                console.error("Error exchanging code for token:", error);
                navigate("/"); // Redirect to landing page on error
            });

            // Clear code from the URL after using it
            window.history.replaceState({}, document.title, "/callback");
        }
    }, [navigate]);

    return <div>Logging you in...</div>;
};

export default SpotifyCallback;

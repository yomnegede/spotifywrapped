const clientId = "0f9a4ead106e4e5d8951e059417efcbb"; 
const redirectUri = "http://localhost:3000/callback"; 
const scopes = [
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "user-read-recently-played",
    "user-top-read"
];

export const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(" "))}&show_dialog=true`;

import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import spotifyImage from './images/spotify.png';

// Define light and dark themes
const lightTheme = {
    background: '#f5f5f5', // Softer light theme background
    textColor: '#000000',
    borderColor: '#9b59b6',
    buttonBg: '#9b59b6',
};

const darkTheme = {
    background: '#1e1e2e',
    textColor: '#ffffff',
    borderColor: '#9b59b6',
    buttonBg: '#9b59b6',
};

// Spotify Client ID and Redirect URI
const clientId = "0f9a4ead106e4e5d8951e059417efcbb"; // Replace with your Client ID
const redirectUri = "http://localhost:3000/callback"; // Replace with your redirect URI
const scopes = [
    "user-read-private",
    "user-read-email"
    // Add additional scopes as needed
];

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(" "))}`;

// Styled components
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textColor};
    position: relative;
`;

const BorderWrapper = styled.div`
    border: 5px solid ${(props) => props.theme.borderColor};
    border-radius: 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`;

const Header = styled.h1`
    font-size: 2rem;
    font-family: 'Arial, sans-serif';
`;

const Image = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 1rem;
    text-align: center;
`;

const NextButton = styled.button`
    background-color: ${(props) => props.theme.buttonBg};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 1rem;
    &:hover {
        opacity: 0.8;
    }
`;

// Toggle switch button styles
const ToggleSwitch = styled.button`
    position: absolute;
    top: 20px;
    right: ${(props) => props.rightOffset};
    background: ${(props) => props.theme.buttonBg};
    color: white;
    border: none;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
`;

// Main component
const LandingPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);  // Default to dark mode
    const [isLoginPage, setIsLoginPage] = useState(true); // Default to login page

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const togglePage = () => setIsLoginPage(!isLoginPage);

    const handleSpotifyLogin = () => {
        window.location.href = authUrl;
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <Wrapper>
                {/* Theme Toggle Switch */}
                <ToggleSwitch rightOffset="100px" onClick={toggleTheme}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </ToggleSwitch>

                {/* Register/Login Toggle Switch */}
                <ToggleSwitch rightOffset="20px" onClick={togglePage}>
                    {isLoginPage ? 'Register' : 'Login'}
                </ToggleSwitch>

                <Header>Spotify Wrapped</Header>
                <BorderWrapper>
                    <Image src={spotifyImage} alt="Spotify Wrapped" />
                    <Description>
                        {isLoginPage
                            ? "Let's look at what you've been listening to this year!"
                            : "Join us to see your personalized Spotify Wrapped!"}
                    </Description>
                    <NextButton onClick={handleSpotifyLogin}>Log in with Spotify</NextButton>
                </BorderWrapper>
            </Wrapper>
        </ThemeProvider>
    );
};

export default LandingPage;

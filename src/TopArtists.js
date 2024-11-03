import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Styled components for the Top Artists screen
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ff5c5c; /* Matching red background */
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  margin-bottom: 20px;
`;

const ArtistCard = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
  width: 300px;
`;

const ArtistImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ArtistName = styled.p`
  font-size: 1.2rem;
`;

const NextButton = styled.button`
  background-color: white;
  color: #ff5c5c; /* Red text to match theme */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
    background-color: #ff9999; /* Lighter red on hover */
    color: white; /* White text on hover */
  }
`;

// Main component for Top Artists
const TopArtists = () => {
    // Sample data for top artists (replace with actual data from Spotify API)
    const artists = [
        { name: "Travis Scott", imageUrl: "https://link-to-travis-image.jpg" },
        { name: "Playboi Carti", imageUrl: "https://link-to-playboi-image.jpg" },
        { name: "Frank Ocean", imageUrl: "https://link-to-frank-image.jpg" }
    ];

    return (
        <Wrapper>
            <Title>Top Artists</Title>
            {artists.map((artist, index) => (
                <ArtistCard key={index}>
                    <ArtistImage src={artist.imageUrl} alt={artist.name} />
                    <ArtistName>{artist.name}</ArtistName>
                </ArtistCard>
            ))}
            <NextButton>Next</NextButton>
        </Wrapper>
    );
};

export default TopArtists;
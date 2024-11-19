import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const navigate = useNavigate();

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // Filler data for the developers
    const developers = [
        {
            name: "Alex Johnson",
            image: "https://via.placeholder.com/150",
            description: "Alex is a passionate front-end developer who loves creating interactive user interfaces. In this project, Alex focused on implementing responsive designs and seamless user experiences."
        },
        {
            name: "Samantha Lee",
            image: "https://via.placeholder.com/150",
            description: "Samantha is a back-end wizard with a knack for databases and APIs. She ensured that our app communicates efficiently with Spotify's API and handles user data securely."
        },
        {
            name: "Michael Chen",
            image: "https://via.placeholder.com/150",
            description: "Michael is a full-stack developer who enjoys working across the tech stack. He played a crucial role in integrating front-end and back-end functionalities for a smooth experience."
        },
        {
            name: "Rachel Smith",
            image: "https://via.placeholder.com/150",
            description: "Rachel specializes in UI/UX design and made sure our app is both beautiful and intuitive. Her attention to detail ensures users enjoy exploring their Spotify Wrapped."
        },
        {
            name: "David Martinez",
            image: "https://via.placeholder.com/150",
            description: "David is a DevOps expert who set up our deployment pipeline and managed the infrastructure. Thanks to him, our app runs efficiently and reliably for users around the world."
        },
        {
            name: "Emma Davis",
            image: "https://via.placeholder.com/150",
            description: "Emma is a machine learning enthusiast who explored data insights for our app. She worked on analyzing user listening patterns and generating fun, personalized facts."
        }
    ];

    return (
        <div className={`${isDarkMode ? 'bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#1DB954] text-white' : 'bg-gradient-to-br from-[#f0f4f8] via-[#dfe6ed] to-[#cbd5e0] text-black'} min-h-screen py-20 px-10 transition-colors duration-300`}>
            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="absolute top-10 right-10 bg-green-500 text-white px-8 py-3 text-xl rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* Back to Profile Button */}
            <button
                onClick={() => navigate('/profile')}
                className="absolute top-10 left-10 bg-red-600 text-white px-8 py-3 text-xl rounded-full shadow-md hover:bg-red-700 transition-transform duration-200 focus:outline-none"
            >
                Back to Profile
            </button>

            <div className="flex flex-col items-center">
                <h1 className="text-5xl font-extrabold mb-8">About Us</h1>
                <div className="max-w-4xl text-center mb-10">
                    <p className="text-2xl mb-4">
                        Welcome to our Spotify Wrapped application! Our mission is to provide you with an engaging and personalized experience, showcasing your top songs, artists, albums, and more.
                    </p>
                    <p className="text-2xl mb-8">
                        We are a team of six passionate developers who worked together to bring this project to life. Here's a little bit about each of us:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {developers.map((dev, index) => (
                        <div key={index} className="bg-[#282828] text-white rounded-lg p-6 shadow-2xl transform transition hover:scale-105 hover:shadow-3xl">
                            <img src={dev.image} alt={dev.name} className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md border-4 border-green-500" />
                            <h3 className="text-2xl font-bold mb-2">{dev.name}</h3>
                            <p className="text-lg">{dev.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const navigate = useNavigate();

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // Updated data for the developers
    const developers = [
        {
            name: "Yom",
            image: "https://via.placeholder.com/150",
            description: " Designed and implemented user-facing features in the frontend, focusing on responsiveness and interactivity. Collaborated on backend API integration to ensure seamless data flow between the server and the UI. Contributed to refining the application's visual design to enhance the overall user experience."
        },
        {
            name: "Vidul",
            image: "https://via.placeholder.com/150",
            description: " Developed backend logic for API endpoints, ensuring secure and efficient data handling. Assisted in frontend development by implementing dynamic components and integrating backend functionality. Worked on creating a cohesive design language that balanced aesthetics and usability."
        },
        {
            name: "Ayman",
            image: "https://via.placeholder.com/150",
            description: " Bridged the frontend and backend by developing end-to-end features that required integration across both layers. Worked on backend API structure and ensured it aligned with the frontend requirements. Contributed to the visual design by ensuring consistency in layout and styling across the application."
        },
        {
            name: "Siddharth",
            image: "https://via.placeholder.com/150",
            description: " Implemented core frontend functionality, focusing on responsive design and interactivity. Contributed to backend development by enhancing data processing and API integration. Worked closely on designing a user-friendly interface that aligned with modern UI/UX principles."
        },
        {
            name: "Aditya",
            image: "https://via.placeholder.com/150",
            description: " Worked across the frontend and backend to ensure smooth feature implementation, focusing on both visual and functional aspects. Enhanced the backend architecture to support complex user interactions. Contributed to the application's overall design by ensuring clarity and ease of use in the user experience."
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
                        We are a team of five passionate developers who worked together to bring this project to life. Here's a little bit about each of us:
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

                {/* Contact Us Section */}
                <div className="mt-16 bg-[#282828] text-white rounded-xl p-8 shadow-xl max-w-3xl text-center">
                    <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                    <p className="text-lg mb-6">If you have any questions or feedback, feel free to reach out to us!</p>
                    <a
                        href="mailto:adityasimhadri1@gmail.com"
                        className="bg-green-500 text-white px-8 py-4 text-2xl rounded-lg shadow-md hover:bg-green-600 transition-transform duration-200"
                    >
                        Send an Email
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

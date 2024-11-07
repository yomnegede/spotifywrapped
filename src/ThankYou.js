import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-400 to-gray-600 p-5">
            <button onClick={() => navigate('/')} className="absolute top-5 left-5 bg-gray-600 text-white px-4 py-2 rounded-full">
                Log out
            </button>
            <button onClick={() => navigate('/profile')} className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/user.png" alt="Profile" className="w-6 h-6" />
            </button>
            <h1 className="text-5xl text-white mb-10 font-bold drop-shadow-lg">Thank You!</h1>
            <p className="text-3xl text-white text-center mb-6">
                Hope you enjoyed your 2024 Spotify Wrapped!
            </p>
            <button onClick={() => navigate('/')} className="mt-8 bg-white text-gray-600 px-8 py-3 rounded-lg text-xl hover:bg-gray-600 hover:text-white transition">
                Start Over
            </button>
        </div>
    );
};

export default ThankYou;

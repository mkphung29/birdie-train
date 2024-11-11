import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function InitialPage(){
    const navigate = useNavigate();

    return(
        <div className="relative min-h-screen">
            <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url(/backdrop.png)' }}
            ></div>

            <div 
                className="absolute top-0 left-0 w-full h-full bg-black"
                style={{ opacity: 0.7 }}  
            ></div>

            <div className="absolute top-4 right-4 z-50">
                <button className="px-4 py-2 bg-teal-800 text-white rounded-full hover:bg-teal-600"
                onClick={() => navigate('/login')}>
                    Login
                </button>
            </div>

            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center space-y-6 z-40">
                <h1 className="text-5xl font-bold text-white text-center">
                    Get On The Birdie Train
                </h1>
                
                <Link to="/signup">
                    <button className="px-6 py-3 bg-yellow-300 text-teal-800 rounded-full hover:bg-yellow-400 transition">
                        Create Your Account
                    </button>
                </Link>
            </div>
        </div>
    );
}

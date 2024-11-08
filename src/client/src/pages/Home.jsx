import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        async function fetchRounds(){
            const response = await fetch('/api/rounds');
            const data = await response.json();
            setRounds(data);
        }
        fetchRounds();
    }, []);

    return (
        <div className="bg-[#c0d0b0] font-poppins min-h-screen p-6">
            <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-[#c0d0b0]">
                {/* Logo on the left */}
                <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded-full" />

                <div className="flex space-x-4">
                    <Link to="/addRound">
                        <button className="px-4 py-2 bg-gray-100 text-green-800 rounded-full hover:shadow-md hover:bg-green-200">
                            Add Round
                        </button>
                    </Link>
                    <button className="px-4 py-2  bg-gray-100 text-green-800 rounded-full hover:shadow-md hover:bg-green-200">
                        Sign Out
                    </button>
                </div>
            </div>
            
            <h2 className="mt-20 mb-5 ml-2 text-4xl font-bold text-teal-900">Your Rounds</h2>
            
            {/* Filter */}
            <ul className={`space-y-2 p-6 border-4 border-green-800 bg-amber-100 rounded-xl ${rounds.length === 0 ? 'min-h-[350px]' : ''}`}>
                {rounds.length === 0 ? (
                    <li className="text-center text-lg text-gray-600">No rounds available</li>
                ) : (
                    rounds.map((round) => (
                        <li key={round._id}>
                            <Link 
                                to={`/${round.courseName.replace(/\s+/g, '-').toLowerCase()}`} 
                                className="text-lg text-blue-700 underline hover:text-blue-500"
                            >
                                {round.courseName}
                            </Link>
                        </li>
                    ))
                )}
            </ul>

            <h3 className="mt-20 text-xl font-semibold text-green-800">Handicap Tracker</h3>
            <h3 className="mt-20 text-xl font-semibold text-green-800">Scoring Average</h3>
            <h3 className="mt-20 text-xl font-semibold text-green-800">Personal Best</h3>
            <h3 className="mt-7 text-lg ">Your Progress:</h3>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        async function fetchRounds(){
            try {
                const response = await fetch('http://localhost:8080/api/rounds');
                //const response = await fetch('http://linserv1.cims.nyu.edu:12190/api/rounds');
                const data = await response.json();
                setRounds(data);
            } catch(error) {
                console.log("Error fetching rounds.");
            }
        }
        fetchRounds();
    }, []);

    const deleteRound = async (roundId, e) => {
        // prevent click from navigating
        e.stopPropagation(); 
        try {
            await fetch(`http://localhost:8080/api/rounds/${roundId}`, {
                //await fetch(`http://linserv1.cims.nyu.edu:12190/api/rounds/${roundId}`, {
                method: 'DELETE',
            });
            setRounds((prevRounds) => prevRounds.filter((round) => round._id !== roundId));
        } catch(error) {
            console.log("Error deleting round.");
        }
    }

    return (
        <div className="bg-[#c0d0b0] font-poppins min-h-screen p-6">
            <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-[#c0d0b0]">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded-full border-black" />

                <div className="flex space-x-4">
                    <Link to="/addRound">
                        <button className="px-4 py-2 bg-gray-100 text-green-800 rounded-full hover:shadow-md hover:bg-green-200">
                            Add Round
                        </button>
                    </Link>
                    <button className="px-4 py-2 bg-gray-100 text-green-800 rounded-full hover:shadow-md hover:bg-green-200">
                        Sign Out
                    </button>
                </div>
            </div>
            
            <h2 className="mt-20 mb-5 ml-2 text-4xl font-bold text-teal-900">Your Rounds</h2>
            
            <ul className={`space-y-2 p-6 border-4 border-green-800 bg-amber-100 rounded-xl ${rounds.length === 0 ? 'min-h-[350px]' : ''}`}>
                {rounds.length === 0 ? (
                    <li className="text-center text-lg text-gray-600">No rounds available</li>
                ) : (
                    rounds.map((round) => (
                        <Link to={`/${round.slug}`} key={round._id}>
                            <li className="p-4 border-2 border-green-800 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition">
                                <div className="text-xl font-bold text-teal-800">{round.courseName}</div>
                                <p className="text-sm text-gray-500">
                                    Date: {new Date(round.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-700">
                                    Score = {round.score}
                                </p>
                                <button 
                                    onClick={(e) => deleteRound(round._id, e)}
                                    className="mt-2 px-4 py-1 bg-[#e5a995] text-white rounded-full hover:bg-[#b68677]"
                                >
                                    Delete
                                </button>
                            </li>
                        </Link>
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

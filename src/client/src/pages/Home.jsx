import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [rounds, setRounds] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        async function fetchRounds(){
            try {
                //const response = await fetch('http://linserv1.cims.nyu.edu:12190/api/rounds', {
                const response = await fetch('http://localhost:8080/api/rounds', {
                    headers: { Authorization: `Bearer ${token}`},
                });
                /*const response = await fetch('http://linserv1.cims.nyu.edu:12190/api/rounds', {
                    headers: { Authorization: `Bearer ${token}`},
                });*/

                if(response.ok){
                    const data = await response.json();
                    setRounds(data);
                }else{
                    console.error('Failed to fetch rounds.');
                }
            } catch(error) {
                console.log("Error fetching rounds.");
            }
        }
        async function fetchUsername(){
            try{
                const response = //await fetch('http://linserv1.cims.nyu.edu:12190/api/user', {
                await fetch('http://localhost:8080/api/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if(response.ok){
                    const data = await response.json();
                    setUsername(data.username);
                }else{
                    console.error('Failed to fetch username');
                }
            }catch(error){
                console.error('Error fetching username: ', error);
            }
        }
        fetchRounds();
        fetchUsername();
    }, []);

    const deleteRound = async (roundId, e) => {
        // prevent click from navigating
        e.stopPropagation(); 
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`http://localhost:8080/api/rounds/${roundId}`, {
                //await fetch(`http://linserv1.cims.nyu.edu:12190/api/rounds/${roundId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if(response.ok){
                setRounds((prevRounds) => prevRounds.filter((round) => round._id !== roundId));
            }else{
                const errorData = await response.json();
                console.error('Error deleting round: ', errorData.message);
            }
        } catch(error) {
            console.log("Error deleting round.");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    }

    return (
        <div className="bg-[#c0d0b0] font-poppins min-h-screen p-6">
            <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-[#c0d0b0]">
                <div className="flex items-center space-x-4">
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded-full border-black" />
                    {username && <span className="text-xl font-bold text-green-800">{username}</span>}
                </div>
                <div className="flex space-x-4">
                    <Link to="/addRound">
                        <button className="px-4 py-2 bg-gray-100 text-green-800 rounded-full hover:shadow-md hover:bg-green-200">
                            Add Round
                        </button>
                    </Link>
                    {/*
                    <Link to="/progress">
                        <button className="px-4 py-2 bg-gray-100 text-green-800 rounded-full hover:shadow-md hover:bg-green-200">
                            Personal Progress Check
                        </button>
                    </Link>*/}
                    <Link to="/">
                        <button onClick={handleLogout} className="px-4 py-2 bg-gray-100 text-green-800 rounded-full hover:shadow-md hover:bg-green-200">
                            Sign Out
                        </button>
                    </Link>
                </div>
            </div>
            
            <h2 className="mt-20 mb-5 ml-2 text-4xl font-bold text-teal-900">Your Rounds</h2>
            
            <ul className={`space-y-2 p-6 border-4 border-green-800 bg-amber-100 rounded-xl ${rounds.length === 0 ? 'min-h-[350px]' : ''}`}>
                {rounds.length === 0 ? (
                    <li className="text-center text-lg text-gray-600">No rounds available</li>
                ) : (
                    rounds.map((round) => (
                        <li key={round._id} className="p-4 border-2 border-green-800 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition">
                            <Link to={`/${round.slug}`}>
                                <div className="text-xl font-bold text-teal-800">{round.courseName}</div>
                                <p className="text-sm text-gray-500">
                                    Date: {new Date(round.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-700">Score = {round.score}</p>
                            </Link>
                            <button 
                                onClick={(e) => deleteRound(round._id, e)} 
                                className="mt-2 px-4 py-1 bg-[#e5a995] text-white rounded-full hover:bg-[#b68677]"
                            >
                                Delete
                            </button>
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

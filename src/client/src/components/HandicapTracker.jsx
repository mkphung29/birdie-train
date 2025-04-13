import React, { useEffect, useState } from 'react';

export default function HandicapTracker() {
    const [handicap, setHandicap] = useState(null);
    const [roundsPlayed, setRoundsPlayed] = useState(0);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const fetchHandicap = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/handicap`, {
            //const response = await fetch('http://localhost:8080/api/handicap', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch handicap index.');
            }

            const data = await response.json();
            setRoundsPlayed(data.roundsPlayed || 0);
            if (data.message) {
                setMessage(data.message);
            } else {
                setHandicap(data.handicapIndex);
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while fetching your handicap.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHandicap();
    }, []); // Fetch data on mount

    return (
        <div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <h2 className="text-2xl font-bold text-teal-800 mb-4">Handicap Index</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : message ? (
                    <p className="text-xl text-red-500">{message}</p>
                ) : (
                    <>
                        <p className="text-4xl font-semibold text-teal-600 mb-2">
                            {handicap?.toFixed(1)}
                        </p>
                        <p className="text-lg text-gray-600">
                            Based on {roundsPlayed} rounds played.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

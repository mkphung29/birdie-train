import React, { useEffect, useState } from 'react';

export default function ScoringAverage() {
    const [average, setAverage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const fetchScoringAverage = async () => {
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch('http://localhost:8080/api/scoring-average', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setAverage(data.scoringAverage);
                setMessage(data.message);
            } else {
                setMessage(data.error || 'Failed to fetch scoring average.');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while fetching your scoring average.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScoringAverage();
    }, []); // Fetch data on mount

    const handleAddRound = async () => {
        // Logic to add a new round (could be a form submission or API call)
        // After adding the round, re-fetch the data
        fetchScoringAverage(); // Re-fetch scoring average data
    };

    return (
        <div>
            <button onClick={handleAddRound}>Add Round</button>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <h2 className="text-2xl font-bold text-teal-800 mb-4">Your Scoring Average</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : message ? (
                    <p className="text-lg text-red-500">{message}</p>
                ) : (
                    <p className="text-4xl font-semibold text-teal-800">{average?.toFixed(1)}</p>
                )}
            </div>
        </div>
    );
}

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

            if (!response.ok) {
                // Handle non-200 responses
                const errorData = await response.json();
                setMessage(errorData.error || 'Failed to fetch scoring average.');
                return;
            }

            const data = await response.json();

            if (data.message) {
                setMessage(data.message); // Handle "No rounds available" message
                setAverage(null);
            } else {
                setAverage(data.scoringAverage);
                setMessage(null); // Clear any previous error message
            }
        } catch (error) {
            console.error('Error fetching scoring average:', error);
            setMessage('An error occurred while fetching your scoring average.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScoringAverage();
    }, []); // Fetch on mount

    return (
        <div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <h2 className="text-2xl font-bold text-teal-800 mb-4">Scoring Average</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : message ? (
                    <p className="text-lg text-red-500">{message}</p>
                ) : (
                    <p className="text-4xl font-semibold text-teal-800">
                        {average?.toFixed(1) || 'N/A'}
                    </p>
                )}
            </div>
        </div>
    );
}

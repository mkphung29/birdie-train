import React, { useEffect, useState } from 'react';

export default function PersonalBest() {
    const [personalBest, setPersonalBest] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPersonalBest = async () => {
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/personal-best`, {
            //const response = await fetch('http://localhost:8080/api/personal-best', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch personal best score.');
            }

            const data = await response.json();
            setPersonalBest(data.personalBest);
            setMessage(data.message || ''); 
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while fetching your personal best.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPersonalBest(); // Fetch personal best on mount
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-bold text-teal-800 mb-4">Personal Best</h2>
            {message ? (
                <p className="text-lg text-gray-700">{message}</p>
            ) : (
                <p className="text-4xl font-semibold text-teal-800">
                    {personalBest !== null ? personalBest : 'N/A'}
                </p>
            )}
        </div>
    );
}

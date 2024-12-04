import React, { useEffect, useState } from 'react';

export default function ScoringAverage(){
    const [average, setAverage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchScoringAverage(){
            const token = localStorage.getItem('accessToken');

            try{
                const response = await fetch('http://localhost:8080/api/handicap', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if(!response.ok){
                    throw new Error('Failed to fetch scoring average.');
                }

                const data = await response.json();
                setAverage(data.scoringAverage);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }

        fetchScoringAverage();
    }, []);

    if (loading) return <div>Loading..,</div>;

    return(
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-bold text-teal-800 mb-4">Your Scoring Average</h2>
            <p className="text-4xl font-semibold text-teal-600">{average?.toFixed(1)}</p>
        </div>
    )
}
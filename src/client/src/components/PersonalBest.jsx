import React, { useEffect, useState } from 'react';

export default function PersonalBest(){
    const [personalBest, setPersonalBest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPersonalBest(){
            const token = localStorage.getItem('accessToken');

            try{
                const response = await fetch('http://localhost:8080/api/personal-best', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if(!response.ok){
                    throw new Error('Failed to fetch personal best score.');
                }

                const data = await response.json();
                setPersonalBest(data.personalBest);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }

        fetchPersonalBest();
    }, []);

    if (loading) return <div>Loading...</div>;

    return(
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Personal Best</h2>
            <p className="text-4xl font-semibold text-purple-600">{personalBest}</p>
        </div>
    )
}
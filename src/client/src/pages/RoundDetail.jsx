import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function RoundDetail() {
    const { slug } = useParams();
    const [round, setRound] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRound() {
            const token = localStorage.getItem('accessToken');
            try {
                const response = //await fetch(`http://linserv1.cims.nyu.edu:12190/rounds/${slug}`, {
                await fetch(`http://localhost:8080/api/rounds/${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        alert('Your session has expired. Please log in again.');
                        navigate('/login');
                    } else if (response.status === 404) {
                        throw new Error('Round not found.');
                    } else {
                        throw new Error('Failed to fetch round details.');
                    }
                }

                const data = await response.json();
                console.log(data); 
                setRound(data);
            } catch (error) {
                console.error(error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        }
        fetchRound();
    }, [slug, navigate]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!round) {
        return <div className="text-center text-red-500">Round details not found.</div>;
    }

    return (
        <div className="bg-[#c0d0b0] font-poppins min-h-screen p-6">
            <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-[#c0d0b0]">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded-full" />
            </div>

            <h2 className="mt-20 mb-5 text-4xl font-bold text-teal-900 text-center">
                {round.courseName || 'Course Name Unavailable'}
            </h2>

            <div className="space-y-6 p-6 bg-amber-100 border-4 border-green-800 rounded-xl">
                <div>
                    <h3 className="text-2xl font-semibold text-green-800">Score</h3>
                    <p className="text-lg text-green-700">{round.score}</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-green-800">Date</h3>
                    <p className="text-lg text-green-700">{new Date(round.date).toLocaleString()}</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-green-800">COURSE INFO</h3>
                    <p className="text-lg text-green-700">Par: {round.courseInfo?.coursePar}</p>
                    <p className="text-lg text-green-700">Rating: {round.courseInfo?.courseRating}</p>
                    <p className="text-lg text-green-700">Slope: {round.courseInfo?.slopeRating}</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-green-800">STATISTICS</h3>
                    <p className="text-lg text-green-700">Fairways: {round.roundStats?.fairways}</p>
                    <p className="text-lg text-green-700">Greens in Regulation: {round.roundStats?.GIRs}</p>
                    <p className="text-lg text-green-700">Up and Downs: {round.roundStats?.upAndDowns}</p>
                    <p className="text-lg text-green-700">Putts: {round.roundStats?.putts}</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link to="/home">
                    <button className="px-6 py-2 bg-green-800 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600">
                        Back to Rounds
                    </button>
                </Link>
            </div>
        </div>
    );
};

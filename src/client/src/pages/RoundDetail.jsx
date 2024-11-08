import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RoundDetail() {
    /*const { courseNameSlug } = useParams();
    const [round, setRound] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRound() {
            const response = await fetch(`/api/rounds/${courseNameSlug}`);
            const data = await response.json();
            setRound(data);
        }
        fetchRound();
    }, [courseNameSlug]);*/

    return (
        <div className="bg-[#c0d0b0] font-poppins min-h-screen p-6">
            <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-[#c0d0b0]">
                {/* Logo on the left */}
                <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded-full" />
            </div>

            <h2 className="mt-20 mb-5 text-4xl font-bold text-teal-900 text-center">Taconic Golf Club</h2>

            <div className="space-y-6 p-6 bg-amber-100 border-4 border-green-800 rounded-xl">
                <div>
                    <h3 className="text-2xl font-semibold text-green-800">Score</h3>
                    <p className="text-lg text-green-700">76</p>
                </div>
                
                <div>
                    <h3 className="text-2xl font-semibold text-green-800">Date</h3>
                    <p className="text-lg text-green-700">09/12/24</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-green-800">COURSE INFO</h3>
                    <p className="text-lg text-green-700">Par: 71</p>
                    <p className="text-lg text-green-700">Rating: 73</p>
                    <p className="text-lg text-green-700">Slope: 120</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-green-800">STATISTICS</h3>
                    <p className="text-lg text-green-700">Fairways: 12</p>
                    <p className="text-lg text-green-700">Greens in Regulation: 9</p>
                    <p className="text-lg text-green-700">Up and Downs: 3</p>
                    <p className="text-lg text-green-700">Putts: 31</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link to="/">
                    <button className="px-6 py-2 bg-green-800 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600">
                        Back to Rounds
                    </button>
                </Link>
            </div>
        </div>
    );
}


/*<div>
                <h1>{round.courseName}</h1>
                <h1>Score: {round.score}</h1>
                <h1>Date: {new Date(round.date).toLocaleDateString()}</h1>
            </div>
            <h3>COURSE INFO</h3>
            <p>Par: {round.courseInfo.coursePar}</p>
            <p>Rating: {round.courseInfo.courseRating}</p>
            <p>Slope: {round.courseInfo.slopeRating}</p>

            <h3>STATISTICS</h3>
            <p>Farways: {round.roundStats.fairways}</p>
            <p>Greens in Regulation: {round.roundStats.GIRs}</p>
            <p>Up and Downs: {round.roundStats.upAndDowns}</p>
            <p>Putts: {round.roundStats.putts}</p>
*/
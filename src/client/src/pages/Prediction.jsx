import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Prediction() {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const token = localStorage.getItem('accessToken');
        
        const payload = {
            courseName: data.courseName,
            yardage: data.yardage,
            goalScore: data.goalScore, 
            comments: data.comments,
        };

        try {
            const response = await fetch('http://localhost:8080/api/predictions', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                reset();
                navigate('/home'); 
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error: ', error);
            alert('Error saving prediction.');
        }
    };

    return (
        <div className="bg-[#c0d0b0] font-poppins min-h-screen p-6">
            <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-[#c0d0b0]">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded-full" />
            </div>

            <h2 className="mt-11 text-4xl font-bold text-teal-900 text-center">Add Prediction</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-amber-100 border-4 border-green-800 rounded-xl">
                <div>
                    <label className="block text-lg font-semibold text-green-800">Course Name</label>
                    <input
                        type="text"
                        {...register("courseName")}
                        className="w-full p-3 mt-2 rounded-lg border-2 border-green-800 focus:outline-none focus:border-green-600"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold text-green-800">Yardage</label>
                    <input
                        type="number"
                        {...register("yardage")}
                        className="w-full p-3 mt-2 rounded-lg border-2 border-green-800 focus:outline-none focus:border-green-600"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold text-green-800">Desired Score</label>
                    <input
                        type="number"
                        {...register("goalScore")}
                        className="w-full p-3 mt-2 rounded-lg border-2 border-green-800 focus:outline-none focus:border-green-600"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold text-green-800">Comments</label>
                    <textarea
                        {...register("comments")}
                        rows="4"
                        className="w-full p-3 mt-2 rounded-lg border-2 border-green-800 focus:outline-none focus:border-green-600"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-green-800 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 mx-auto block">
                    Save Prediction
                </button>
            </form>
        </div>
    );
}

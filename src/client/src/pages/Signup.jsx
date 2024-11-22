import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const password = watch('password');

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
                reset();
                navigate('/home');
            } else {
                console.log(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="absolute top-0 w-full h-full bg-cover bg-center"
                 style={{ backgroundImage: 'url(/backdrop.png)' }}>
            </div>

            <div className="relative z-10 p-8 bg-white border-4 border-green-800 rounded-xl shadow-lg w-11/12 max-w-md">
                <h2 className="text-4xl font-bold text-green-800 text-center mb-4">
                    Create an Account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-lg font-semibold text-green-800">Username</label>
                        <input 
                            type="text"
                            {...register('username', { required: 'Username is required' })}
                            className="w-full p-3 mt-2 rounded-lg border-2 border-green-800 focus:outline-none focus:border-green-600"
                        />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-green-800">Password</label>
                        <input 
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full p-3 mt-2 rounded-lg border-2 border-green-800 focus:outline-none focus:border-green-600"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-green-800">Confirm Password</label>
                        <input 
                            type="password"
                            {...register('confirmPassword', { 
                                required: 'Please confirm your password',
                                validate: value => value === password || 'Passwords do not match'
                            })}
                            className="w-full p-3 mt-2 rounded-lg border-2 border-green-800 focus:outline-none focus:border-green-600"
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-green-800 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 w-full"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

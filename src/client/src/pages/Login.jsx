import React from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://linserv1.cims.nyu.edu:12190/api/login', {
            //await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('accessToken', result.accessToken);
                window.location.href = '/home';
            } else {
                alert(result.message);
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
                    Login to Your Account
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
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-green-800 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

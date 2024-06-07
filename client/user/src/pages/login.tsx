import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { useMutation } from 'react-query';
import { loginApi, verifyApi } from '../api/authActions';
import { useNavigate } from 'react-router-dom';



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { mutate } = useMutation(loginApi);

    const verify = useMutation(
        verifyApi, {
        onSuccess: (data) => {
            if (data !== "Not found token") {
                dispatch(
                    login(data)
                );
                navigate('/admin/tab1')
            } 
        },
        onError: (err) => {
            console.log(err);
        },
    }
    )


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const credentials = {
            email: email,
            password: password
        };

        mutate(credentials, {
            onSuccess: (data) => {
                if (data !== 'Invalid email or password') {
                    verify.mutate()
                } else alert(data)

            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    return (
        <div className='pt-32 h-screen'>
            <form onSubmit={handleSubmit}
                className="max-w-sm mx-auto bg-blue-100 dark:bg-gray-800 p-4 rounded-md dark:border dark:border-gray-600">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Submit
                </button>
            </form>
        </div>
    )
}
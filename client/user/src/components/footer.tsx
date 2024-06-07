import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const date = new Date();
    return (
        <footer className=" bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link to={'/'} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FoodOpt</span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <p className="hover:underline me-4 md:me-6">About</p>
                        </li>
                        <li>
                            <p className="hover:underline me-4 md:me-6">Privacy Policy</p>
                        </li>
                        <li>
                            <p className="hover:underline me-4 md:me-6">Licensing</p>
                        </li>
                        <li>
                            <p className="hover:underline">Contact</p>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {date.getFullYear()} 
                    <Link to={'/'} className="hover:underline"></Link>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}
import React from "react";
import { Link } from "react-router-dom";

export default function FoodCard() {
    return (
        <div className="w-fit relative cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/food/id`}>
                <img className="rounded-lg w-80 h-96"
                    src="https://i.pinimg.com/564x/40/b7/e4/40b7e449324bd5470a1a3f249fc3dddb.jpg" alt="" />
            </Link>
            <div className="p-5 absolute z-20 bottom-0 rounded-b-lg bg-gray-400/45">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    Noteworthy technology acquisitions 2021
                </h5>
                <p className="mb-3 font-normal text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <Link to={`/food/id`}>
                <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Xem thêm
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </div>
                </Link>
            </div>
        </div>
    )
}
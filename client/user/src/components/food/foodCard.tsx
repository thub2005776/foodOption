import React from "react";
import { Link } from "react-router-dom";
import { FavoritedButton, Rating } from '../../components';

export default function FoodCard({ image, title, content }: { image: string, title: string, content: string }) {
    const handleFavortied = (result: boolean) => {
        console.log(result);
        
    }
    return (
        <div className="w-fit relative cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/food/id`}>
                <img className="rounded-lg w-80 h-96"
                    src={image} alt="" />
            </Link>

            <div className="absolute top-5 right-4">
                <FavoritedButton liked={handleFavortied}/>
            </div>
            
            <div className="p-5 absolute z-20 w-full bottom-0 rounded-b-lg bg-gray-400/45">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    {title}
                </h5>
                <p className="mb-3 font-normal text-gray-400">
                    {content}
                </p>
                <div className="flex justify-between">
                    <Link to={`/food/id`}>
                        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Xem thêm
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </div>
                    </Link>
                    <Rating
                        rate={4.45}
                        amount={30} />
                </div>
            </div>
        </div>
    )
}
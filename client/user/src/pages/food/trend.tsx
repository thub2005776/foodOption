import React from "react";
import { FoodCard, TopicCard } from "../../components";
import { useQuery } from "react-query";
import {  getTopic } from "../../api/foodApi";

export default function Trend() {
    const { data: topic} = useQuery('topic', () => getTopic());

    return (
        topic &&
        <div className="lg:mx-20 mx-10">

            {/* Topic List */}
            <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Hôm nay ăn gì!
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {Array.isArray(topic) && topic.map((item, i) => (
                        <TopicCard key={i} topic={item} />
                    ))}
                </div>
            </div>

            {/* Hot Trend*/}
            <div className="mb-6">
                <div>
                    <div className="bg-orange-400 text-yellow-800 text-lg font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-orange-100 dark:text-orange-400 mb-2">
                        <svg className="w-6 h-6 text-red-500 dark:text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
                        </svg>
                        Hot Trend
                    </div>
                </div>
                <div className="ms-5 flex gap-2">

                    <FoodCard food={{
                        name: "abc",
                        rating: '3.5',
                        price: '25.000'
                    }} />
                    <FoodCard food={{
                        name: "abc",
                        rating: '3.5',
                        price: '25.000'
                    }} />
                </div>
            </div>

            {/* Top Seller*/}
            <div className="mb-6">
                <div>
                    <div className="bg-green-400 text-green-800 text-lg font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-green-100 dark:text-green-400 mb-2">
                        <svg className="w-6 h-6 text-green-900 dark:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>

                        Top Bán Chạy
                    </div>
                </div>
                <div className="ms-5 flex gap-2">

                    <FoodCard food={{
                        name: "abc",
                        rating: '3.5',
                        price: '25.000',
                        sold: '30'
                    }} />
                    <FoodCard food={{
                        name: "abc",
                        rating: '3.5',
                        price: '25.000',
                        sold: '14'

                    }} />
                </div>
            </div>
        </div>
    )
}
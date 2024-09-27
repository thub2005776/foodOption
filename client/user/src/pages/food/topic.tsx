import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getFoodByTopicIdApi, getTopicById } from "../../api/foodApi";
import { FoodCard } from "../../components";

export default function Topic() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const { data: topic } = useQuery(id, () => getTopicById(id));
    const { data: food } = useQuery(`${id}_food`, () => getFoodByTopicIdApi(id));

    const image = 'https://i.pinimg.com/564x/be/97/8e/be978ee2cde8a1a72402e1af513a5f9f.jpg';
    return (
        topic && food &&
        <div className="h-screen lg:mx-20 mx-10">
            <div className="p-4 m-3 flex gap-5 shadow-md dark:bg-gray-800">
                <img
                    className="w-44"
                    src={image} alt="topic" />
                <div>
                    <h5 className="m-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {topic['name']}
                    </h5>
                    <p className="text-gray-500">{food.length} món ăn</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                    {Array.isArray(food) && food.map((item, i) => (
                        <FoodCard key={i} food={item} /> ))}
                </div>
        </div>
    )
}
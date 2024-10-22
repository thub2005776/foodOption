import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getFoodByTopicIdApi, getTopicById } from "../../api/foodApi";
import { FoodCard } from "../../components";
import { getFoodGroupByTid } from "../../api/foodApi";

export default function Topic() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const { data: topic } = useQuery(id, () => getTopicById(id));
    const { data: group } = useQuery(`${id}_group`, () => getFoodGroupByTid(id));
    const { data: food } = useQuery(`${id}_food`, () => getFoodByTopicIdApi(id));

    const [isOpen, setIsOpen] = useState(false);
    const [fgroup, setFgroup] = useState({name: 'Tất cả', id: 'all'});

    const filterFood = Array.isArray(food) && food.length > 0 && food.filter(f => f['groupID'] === fgroup.id || fgroup.id === 'all');

    const image = 'https://i.pinimg.com/564x/be/97/8e/be978ee2cde8a1a72402e1af513a5f9f.jpg';
    return (
        topic && food && group && filterFood &&
        <div className="lg:mx-20 mx-10">
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

            <div className="absolute right-[6rem] top-[15rem] z-10 w-[15rem]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button">
                    {fgroup.name}
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {/* <!-- Dropdown menu --> */}
                {isOpen &&
                    <div className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
                        <li onClick={() => setIsOpen(false)}>
                                    <div 
                                    onClick={() => setFgroup({name:'Tất cả', id: 'all'})}
                                    className="block px-4 py-2 text-wrap hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                                        Tất cả
                                    </div>
                                </li>
                            {Array.isArray(group) && group.map((item, i) => (
                                <li onClick={() => setIsOpen(false)} key={i}>
                                    <div 
                                    onClick={() => setFgroup({name: item['name'], id: item['_id']['$oid']})}
                                    className="block px-4 py-2 text-wrap hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                                        {item['name']}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>}
            </div>

            <div className="flex flex-wrap gap-1 ms-16">
                {Array.isArray(filterFood) && filterFood.map((item, i) => (
                    <FoodCard key={i} food={item} />))}
            </div>
        </div>
    )
}
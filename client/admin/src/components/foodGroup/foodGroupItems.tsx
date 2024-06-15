import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BackButton, Delete, FoodList } from "../../components";
import { getTopicById } from "../../api/foodApi";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function FoodGroupItems() {
    const auth = useSelector(selectUser);
    const location = useLocation();
    const code = location.pathname.split('/')[2];
    const { data: topic } = useQuery('topic', () => getTopicById(code));

    const handleDelete = (res:boolean) => {
        console.log(res);
        
    }
    return (
        auth && topic &&
        <div className="h-screen dark:text-white mx-5 lg:mx-32">
            <div className="flex  gap-4 mb-6">
                <BackButton />
            </div>
            <div className="flex gap-5 text-center">
                <div className="p-4 h-20 bg-purple-100 dark:bg-gray-800 dark:boder dark:border-gray-600 rounded-md">
                    <p className="text-purple-800 dark:text-white font-bold text-lg">
                        {topic['name']}
                    </p>
                    <p className="text-gray-600">
                        ID: {topic['_id'].$oid}
                    </p>
                    <Delete name={topic['name']} res={handleDelete}/>
                </div>
                <div className="flex-1">
                    <FoodList />
                </div>

            </div>
        </div>
    );
};
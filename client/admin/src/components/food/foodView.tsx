import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";

export default function FoodView({type, food }: {type:string, food: Object }) {
    const {data: imageFile } = useQuery(food['image'], () => downloadApi(food['image']));

    const image = 'https://i.pinimg.com/736x/10/50/cd/1050cdf0d4bb8a8c99858ca280e61920.jpg';
    const link = type === 'food'? 'food/detail': 'topic'
    return (
        food && imageFile &&
        <Link to={`/${link}/${food['_id']['$oid']}`}>
            <div className="p-2 mb-2 bg-gray-100 dark:bg-gray-800 rounded-md flex gap-5">
                <img src={imageFile instanceof Blob? URL.createObjectURL(imageFile): image} alt="food" 
                className="w-10"/>
                <div className="font-medium text-gray-900 dark:text-white flex gap-5">
                    {food['name']}
                </div>
            </div>
        </Link>
    );
};
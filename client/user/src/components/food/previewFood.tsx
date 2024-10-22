import React from "react";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { Link, useNavigate } from "react-router-dom";

export default function PreviewFood({ food }: { food: Object }) {
    const { data: imageFile } = useQuery(food ? food['image'] : 'foodimage', () => downloadApi(food ? food['image'] : 'food.jpg'));

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/food/${food['_id']['$oid']}`)
        document.location.reload()
    }
    return (
        food && imageFile instanceof Blob &&
        <div onClick={handleClick}
        className="flex gap-3 mb-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-md hover:cursor-pointer">
            <img src={URL.createObjectURL(imageFile)} alt="food" className="w-10" />
            <p>{food['name']}</p>
        </div>
    );
};
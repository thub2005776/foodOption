import React from "react";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";

export default function FoodCard() {
    const { data: imageFile } = useQuery('imageFile', () => downloadApi('food.jpg'))
    return (
        imageFile &&
        <div className="w-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
                <img className="p-1 w-60 h-60 rounded-t-lg" src={URL.createObjectURL(imageFile)} alt="food" />
            </div>
            <div className="px-5 pb-5">
                <div>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Món ăn
                    </h5>
                </div>
               
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                    <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Chi tiết</div>
                </div>
            </div>
        </div>

    );
};
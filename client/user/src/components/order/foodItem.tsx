import React from "react";
import { Statistic } from 'antd';
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";

export default function FoodItem({ foodItem }: { foodItem: Object }) {

    const { data: imageFile } = useQuery(foodItem['food'] && foodItem['food']['image'], () => downloadApi(foodItem['food'] ? foodItem['food']['image'] : 'food.jpg'));
    const image = 'https:i.pinimg.com/564x/62/b0/58/62b05832fae87fdabf74517176f30c1f.jpg';
    
    return (
        <li className="m-5 text-gray-900 dark:text-white">
            <div className="flex justify-between border-b-[0.5px]">
                <div className="flex gap-5">
                    <img src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : image} className="w-20" alt="food" />
                    <div >
                        <p className="text-xl font-semibold">{foodItem['food']!.name}</p>
                        <p className="text-gray-600">x {foodItem['quantity']}</p>
                    </div>
                </div>

                <div className="pt-10 font-bold text-red-600 dark:text-red-500">
                    <Statistic valueStyle={{ color: '#e02424' }} value={foodItem['food']!.price} suffix="đ" />
                </div>
            </div>
        </li>
    );
};
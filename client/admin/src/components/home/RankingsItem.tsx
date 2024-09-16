import React from "react";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { Rate } from 'antd';

export default function RankingsItem() {
    const { data: imageFile } = useQuery('imageFile', () => downloadApi('food.jpg'))
    return (
        imageFile &&
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th  className="px-6 py-4">
                <p className="text-lg font-bold">1</p>
            </th>

            <td className="px-6 py-4 flex items-center  text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={URL.createObjectURL(imageFile)} alt="" />
                <div className="ps-3">
                    <div className="text-base font-semibold">Neil Sims</div>
                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                {<Rate allowHalf defaultValue={3.5} />}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">25</div>
            </td>
        </tr>
    );
};
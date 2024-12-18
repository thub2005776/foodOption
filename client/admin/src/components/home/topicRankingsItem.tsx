import React from "react";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { Rating } from "..";
import { Link } from "react-router-dom";

export default function TopicRankingsItem({ item, index }: { item: Object, index: number }) {
    const { data: imageFile } = useQuery(item['topic']['image'], () => downloadApi(item['topic']['image']));

    const image = 'https://i.pinimg.com/736x/10/50/cd/1050cdf0d4bb8a8c99858ca280e61920.jpg';
    return (
        imageFile && item &&
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th className="px-6 py-4">
                <p className="text-lg font-bold">{index + 1}</p>
            </th>

            <td className="px-6 py-4 flex items-center  text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10" src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : image} alt="food" />
                <div className="ps-3">
                    <div className="text-base font-semibold">{item['topic']['name']}</div>
                </div>
            </td>
           
            <td className="px-6 py-4">
                <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{item['sum']}</div>
            </td>
            <td className="px-6 py-4">
                <Link to={`/topic/statatics/${item['topic']['_id']['$oid']}`}>
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chi tiết</div>
                </Link>
            </td>
        </tr>
    );
};
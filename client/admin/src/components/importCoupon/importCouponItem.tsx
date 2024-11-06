import React from "react";
import { Link } from "react-router-dom";
import { DateTimeDisplay } from "../../components";

export default function ImportCouponItem({item}:{item:Object}) {
    
    return (
        item && item['_id'] &&
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">
                <div className="font-medium text-gray-900 dark:text-white">
                {<DateTimeDisplay datetime={item['updatedAt']['$date']} />}
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="font-medium text-gray-900 dark:text-white ">
                   {item['_id']['$oid']}
                </div>
            </th>
            <td className="px-6 py-4">
                <div className="font-medium text-gray-900 dark:text-white">
                    {item['supplier']['name']}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="font-medium text-gray-900 dark:text-white">
                    {item['staff']['name']} 
                </div>
            </td>
            <td className="px-6 py-4">
                {item['total']} đ
            </td>
            <td className="px-6 py-4">
                <Link to={`/importcoupon/${item['_id']['$oid']}`}>
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Chi tiết
                    </div>
                </Link>
            </td>
        </tr>
    );
};
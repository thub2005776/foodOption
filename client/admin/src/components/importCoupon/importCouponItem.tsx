import React from "react";
import { Link } from "react-router-dom";

export default function OrderItem() {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    1
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    món ăn
                </div>
            </th>
            <td className="px-6 py-4">
                <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    khách hàng
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    vận chuyển
                </div>
            </td>
            <td className="px-6 py-4">
                $2999
            </td>
            <td className="px-6 py-4">
                <Link to={`/order/:id`}>
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Chi tiết
                    </div>
                </Link>
            </td>
        </tr>
    );
};
import React from "react";

export default function Comments() {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Thời gian
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Món ăn
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nội dung
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thêm
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4">
                            Laptop
                        </td>
                        <td className="px-6 py-4">
                            <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</div>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>

    );
};
import React, { useState } from "react";
import { Reply, Delete } from '../../components';

export default function CommList() {
    const com = [{
        image: "https://i.pinimg.com/564x/0a/1f/39/0a1f391965cc20b2dc258bfc6db09705.jpg",
        username: "Bailu",
        date: "11:21",
        content: "Easy!!!"
    },
    {
        image: "https://i.pinimg.com/736x/b1/1c/6f/b11c6ff1267811c3f9b8a10bcbe45778.jpg",
        username: "Caixukun",
        date: "11:14",
        content: "Good!."
    }]

    const [dropdown, setDropdown] = useState(false);
    const options = ['Mới nhất', 'Cũ nhất', 'Đã trả lời', 'Chưa trả lời']
    const [selected, setSelected] = useState('Mới nhất')
    const handleDropdown = (option: string) => {
        setDropdown(false);
        setSelected(option);
    }
    const handleDeleted = (res: boolean) => {

    }
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    <div>
                        <button
                            onClick={() => setDropdown(!dropdown)}
                            id="dropdownActionButton"
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Action button</span>
                            {selected}
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        {dropdown &&
                            <div id="dropdownAction" className="absolute z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                    {options.map((item: string, i: React.Key) => (
                                        <li key={i} onClick={() => handleDropdown(item)}>
                                            <p className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                {item}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>}
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for users" />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Comment
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {com.map((item: Object, i: React.Key) => (
                            <tr key={i}
                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={item['image']} alt="image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{item['username']}</div>
                                        <div className="font-normal text-gray-500"></div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {item['content']}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> {item['date']}
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex">
                                    <Reply />
                                    <Delete name="comment" res={handleDeleted} />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
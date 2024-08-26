import React, { useState } from "react";
import { Rankings } from "../../components";

export default function Main() {
    const [selected, setSelected] = useState('1 tuần');
    const [open, setOpen] = useState(false);

    const selection = ['1 tuần', '1 tháng', '3 tháng', '1 năm'];
    return (
        <div className=" ">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        id="dropdownActionButton"
                        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Action button</span>
                        {selected}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {open &&
                        <div id="dropdownAction" className="absolute z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                {selection.map((item, i) => (
                                   <li key={item}
                                   onClick={() => {
                                    setSelected(item)
                                    setOpen(false)
                                   }}>
                                    <div
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {item}
                                    </div>
                                </li>))}
                            </ul>
                        </div>}
                </div>
            </div>
            <Rankings />
        </div>
    )
}
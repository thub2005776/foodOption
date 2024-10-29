import React, { RefCallback, useState } from "react";

export default function DropdownComponent({ type, data, selectedItem }: { type: string, data: Array<Object>, selectedItem: RefCallback<string> }) {
    const [selected, setSelected] = useState(type);
    const [open, setOpen] = useState(false);
    return (
        <div className="">
            <div className="relative mb-2">
                <button
                    onClick={() => setOpen(!open)}
                    id="dropdownRadioButton"
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    {selected}
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {open &&
                    <div
                        id="dropdownRadio"
                        className="absolute z-[10000] w-48 bg-white  divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" >
                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 cursor-pointer" >
                            {data.length > 0 && data.map((item, i) => (
                                <li key={i}
                                    onClick={() => {
                                        setSelected(item['name'])
                                        selectedItem(item['name'])
                                        setOpen(false)
                                    }}>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        {item['name']}
                                    </div>
                                </li>))}
                        </ul>
                    </div>}
            </div>
        </div>

    )
}
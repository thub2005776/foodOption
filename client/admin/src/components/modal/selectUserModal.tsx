import React, { RefCallback, useState } from "react";

export default function SelectUserModal({ useres, updated }: { useres: Array<Object>, updated: RefCallback<string> }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('');

    const handleUpdated = () => {
        updated(selected);
        setOpen(false);
    }
    
    
    return (
        Array.isArray(useres) &&
        <div>
            {/* <!-- Modal toggle --> */}
            <button
                onClick={() => setOpen(true)}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Cật nhật
            </button>

            {/* <!-- Main modal --> */}
            {open &&
            <div id="select-modal" className="overflow-y-auto overflow-x-hidden top-0 right-0  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="absolute z-[1000] top-0 right-4 p-4 w-[30rem] max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-gray-50 rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Danh sách tài khoản
                            </h3>
                            <button
                                onClick={() => setOpen(false)}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                            <div className="p-4 md:p-5">
                                <p className="text-gray-500 dark:text-gray-400 mb-4">Lựa chọn tài khoản:</p>
                                <ul className="space-y-4 mb-4">
                                    {useres.map((item, i) => (
                                        <li 
                                        key={i} 
                                        className="flex gap-4">
                                            <input
                                            onChange={(e) => setSelected(e.target.value)}
                                                type="radio"
                                                id={item['_id']?.$oid}
                                                name='user'
                                                value={item['_id']?.$oid}
                                                className="mt-10" />
                                            <label htmlFor={item['_id']?.$oid}
                                                className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                                <div className="w-full">
                                                        <div>
                                                            <p className="text-gray-900 dark:text-white font-bold">{item['name']} |
                                                                <span className="text-gray-600 dark:text-white font-bold">(+84) {item['phone']}</span>
                                                            </p>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="text-gray-600 dark:text-white">{item['name']}</p>
                                                                <p className="text-green-500 dark:text-white">{item['role']}</p>
                                                            </div>
                                                        </div>
                                                </div>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="text-gray-400 hover:text-white inline-flex w-full justify-center hover:bg-orange-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-orange-700">
                                        Huỷ
                                    </button>
                                    <button
                                        onClick={handleUpdated}
                                        className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};
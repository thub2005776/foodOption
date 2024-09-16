import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";

export default function UserForm() {
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState('abc')
    const { data: imageFile } = useQuery('imageFile', () => downloadApi('food.jpg'))

    return (
        imageFile &&
        <div className="relative">
            <div
                onClick={() => setOpen(!open)}
                className='flex justify-between gap-5 md:w-72 bg-blue-50 dark:bg-gray-800 p-4 rounded-md'>
                    <img className="w-10 h-10 rounded-full" src={URL.createObjectURL(imageFile)} alt="" />
                    <div className="flex-1 ">
                        <div className="text-base text-gray-900 dark:text-gray-400 font-semibold">Neil Sims</div>
                        <div className="font-normal text-gray-500">phone</div>
                        <div className="flex justify-between">
                            <Link to={`/acc/:id`}>
                                <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Chi tiết
                                </div>
                            </Link>
                            <div>
                                {open ?
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
                                    </svg>
                                    : <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                    </svg>}
                            </div>

                        </div>

                    </div>

            </div>


            {open &&
                <div id="dropdown" className="absolute z-[100] w-full h-60 bg-white divide-y divide-gray-100 rounded-b-lg shadow dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li
                            onClick={() => {
                                setOpen(false)
                                setUserInfo('bcd')
                            }}
                            className='flex justify-evenly cursor-pointer'>
                            <div className="flex gap-5">
                                <img className="w-10 h-10 rounded-full" src={URL.createObjectURL(imageFile)} alt="" />
                                <div className="ps-3">
                                    <div className="text-base text-gray-900 dark:text-gray-400 font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-500">phone</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>}
        </div>
    );
};
import React from "react";
import { useState } from "react";
import { Modal } from 'antd';
import { useQuery } from "react-query";
import { getFoodApi } from "../../api/foodApi";
import {PreviewFood} from "../../components";

export default function SearchModal({ type, data }: { type: string, data: Array<Object> }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState('');

    const searchResult = type === 'food' && Array.isArray(data) && data.filter(f => String(f['name']).toLocaleLowerCase().includes(input));

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        data &&
        <div className="">
            <div onClick={showModal}>
                <svg className="w-8 h-8 cursor-pointer text-blue-400 dark:text-gray-600 hover:text-blue-800 dark:hover:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
            </div>

            <Modal title="Tìm kiếm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <div className="w-full">
                                <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className=" absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        onChange={(e) => setInput(e.target.value)}
                                        type="search"
                                        id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm..." />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                            {Array.isArray(searchResult) && searchResult.length > 0 && searchResult.slice(0,5).map((item, i) => (
                                type === 'food' && <PreviewFood key={i} food={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

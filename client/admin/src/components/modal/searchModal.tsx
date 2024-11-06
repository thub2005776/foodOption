import React from "react";
import { useState } from "react";
import { Modal } from 'antd';
import { FoodView, ImportCouponView} from "../../components";

export default function SearchModal({ type, data }: { type: string, data: Array<Object> }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState('');

    const searchResult = () => {
        var result = [{}]
        if (Array.isArray(data) && data.length > 0) {
            if (type === 'food' || type === 'topic') {
                result = data.filter(f => String(f['name']).toLocaleLowerCase().includes(input));
            } else if (type === 'order') {
                result = data.filter(f => String(f['_id']['$oid']).includes(input));
                if (!result[0]) {
                    result = data.filter(f => String(f['payment']).toLocaleLowerCase().includes(input));
                    if (!result[0]) {
                        result = data.filter(f => String(f['status']).toLocaleLowerCase().includes(input));
                    }
                }
            } else if (type === 'importcoupon') {
                result = data.filter(f => String(f['_id']['$oid']).includes(input));
                if (!result[0]) {
                    result = data.filter(f => String(f['supplier']['name']).toLocaleLowerCase().includes(input));
                    if (!result[0]) {
                        result = data.filter(f => String(f['staff']['name']).toLocaleLowerCase().includes(input));
                    }
                }
            } else if (type === 'user') {
                result = data.filter(f => String(f['_id']['$oid']).includes(input));
                if (!result[0]) {
                    result = data.filter(f => String(f['phone']).toLocaleLowerCase().includes(input));
                    if (!result[0]) {
                        result = data.filter(f => String(f['email']).toLocaleLowerCase().includes(input));

                        if (!result[0]) {
                            result = data.filter(f => String(f['gender']).toLocaleLowerCase().includes(input));
                        }
                    }
                }
            }
        }

        return result;
    }

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
            <div onClick={showModal} className="flex gap-2 p-1 cursor-pointer bg-gray-200/5 dark:bg-gray-800 border border-blue-400 dark:border-gray-600 rounded-lg w-40">
                <svg className="w-6 h-6 cursor-pointer text-blue-400 dark:text-gray-600 hover:text-blue-800 dark:hover:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <p className="text-gray-500">Tìm kiếm...</p>
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
                            {Array.isArray(searchResult()) && searchResult().length > 0 && searchResult().slice(0, 3).map((item, i) => (
                                (type === 'importcoupon' || type === 'order') ? <ImportCouponView type={type} impt={item} />
                                    : (type === 'food' || type === 'topic') &&  <FoodView type={type} food={item} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

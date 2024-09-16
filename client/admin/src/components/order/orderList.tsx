import React, { useState } from "react";
import { OrderItem } from "../../components";

export default function OrderList() {
    const [selected, setSelected] = useState('1 tuần');
    const [open, setOpen] = useState(false);

    const selection = ['Chờ duyệt', 'Đã huỷ', '1 tuần', '1 tháng', '3 tháng', '1 năm'];
    return (
        <div>
            <div className="relative mb-2">
                <button
                    onClick={() => setOpen(!open)}
                    id="dropdownRadioButton"
                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                    </svg>
                    {selected}
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {open &&
                    <div
                        id="dropdownRadio"
                        className="absolute z-[100] w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" >
                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 cursor-pointer" >
                            {selection.map((item, i) => (
                                <li key={i}
                                    onClick={() => {
                                        setSelected(item)
                                        setOpen(false)
                                    }}>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        {item}
                                    </div>
                                </li>))}
                        </ul>
                    </div>}
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                Thời gian
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Món ăn
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Khách hàng
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Vận chuyển
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Đơn giá
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thêm
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderItem />
                    </tbody>
                </table>
            </div>
        </div>

    );
};
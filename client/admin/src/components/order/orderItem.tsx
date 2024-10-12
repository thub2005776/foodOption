import React, { useState } from "react";
import { Statistic } from 'antd';
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { TimeAgo } from "../../components";
import { updateOrderApi } from "../../api/orderApi";

export default function OrderItem({ item }: { item: Object }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(item['status']);

    const statusList = [
        { tab: 'preparing', title: 'Đang chuẩn bị' },
        { tab: 'delivering', title: 'Đang giao' },
        { tab: 'completed', title: 'Hoàn thành' },
        { tab: 'canceled', title: 'Huỷ' },
    ]

    const updatedStatus = useMutation(
        updateOrderApi, {
            onSuccess(data, variables, context) {
                console.log(data);
                
            },
        onError(error, variables, context) {
            console.log(error);

        },
    }
    )

    const handlleUpdatedStatus = () => {
        const values = {
            id: item['_id'].$oid,
            status: status,
            updatedAt: Date(),
        }

        updatedStatus.mutate(values);
        setOpen(false)
    }
    return (
        item &&
        <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center px-6 py-4">
                    <TimeAgo dateTimeString={item['updatedAt']} />
                </div>
            </td>
            <td className="py-4 relative">
                <div className="absolute top-7 z-[100000]">
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        {status}
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {/* <!-- Dropdown menu --> */}
                    {open &&
                        <div className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
                                {statusList.map((item, i) => (
                                    <li key={i}>
                                        <div
                                            onClick={() => setStatus(item.tab)}
                                            className={`${status === item.tab && "bg-gray-100 dark:bg-gray-600 "}  "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"`}>
                                            {item.tab}
                                        </div>
                                    </li>
                                ))}

                            </ul>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-gray-400 hover:text-white inline-flex w-fit justify-center hover:bg-orange-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-orange-700">
                                    Huỷ
                                </button>
                                <button
                                    onClick={handlleUpdatedStatus}
                                    className="text-white inline-flex w-fit justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Xác nhận
                                </button>
                            </div>
                        </div>}
                </div>
            </td>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link to={`/order/${item['_id'].$oid}`}>
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        {item['_id'].$oid}
                    </div>
                </Link>
            </th>
            <td className="px-6 py-4">
                <Statistic value={item['total']} suffix="đ" />
            </td>
            <td className="px-6 py-4">
                <div className="font-medium text-blue-600 dark:text-blue-500">
                    {item['payment']}
                </div>
            </td>
            <td className="px-6 py-4">
                <Link to={`/order/${item['_id'].$oid}`}>
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Chi tiết
                    </div>
                </Link>
            </td>
        </tr>
    );
};
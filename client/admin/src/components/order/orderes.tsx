import React, { useState } from "react";
import { DateTimeDisplay, FoodItem } from "../../components";
import { useMutation } from "react-query";
import { updateOrderApi } from "../../api/orderApi";

export default function OrdereDisplay({ order }: { order: Object }) {

    const [open, setOpen] = useState(false);

    const statusNow = Array.isArray(order['status']) && order['status'][order['status'].length-1]['status'];
    const [status, setStatus] = useState(statusNow);

    const statusList = [
        { tab: 'preparing', title: 'Đang chuẩn bị' },
        { tab: 'delivering', title: 'Đang giao' },
        { tab: 'delivered', title: 'Hoàn thành' },
        { tab: 'canceled', title: 'Huỷ' },
    ]

    const updatedStatus = useMutation(
        updateOrderApi, {
            onError(error, variables, context) {
                console.log(error);
                
            },
        }
    )

    const handlleUpdatedStatus = () => {
        setOpen(false)
        const values = {
            id: order['_id'].$oid,
            newstatus: {status: status, time: Date()},
            updatedAt: Date(),
        }

        updatedStatus.mutate(values);
    }
    
    return (
        order &&
        <div className="mx-10 m-5">
            <div className="mb- p-2 rounded-md shadow-sm bg-gray-100 dark:bg-gray-800">
                <div className="flex justify-between p-4 text-gray-900 dark:text-white  border-b-[0.5px]">
                    <p className="text-gray-600 dark:text-white">
                        Thời gian đặt hàng:
                        <DateTimeDisplay datetime={order['updatedAt']['$date']} />
                        
                    </p>
                    <div className="relative">
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
                         <div id="dropdown" className="absolute z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
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
                </div>
                <ul className="">
                    {Array.isArray(order['detail']) && order['detail'].map((foodItem, i) => (
                        <FoodItem key={i} foodItem={foodItem} total={order['total']} />
                    ))}
                </ul>
            </div>
        </div>
    );
};
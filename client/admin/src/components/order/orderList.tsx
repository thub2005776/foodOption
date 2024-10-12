import React, { useState } from "react";
import { OrderItem, OrderTable } from "../../components";
import { useQuery } from "react-query";
import { getOrderApi } from "../../api/orderApi";

export default function OrderList() {
    const {data: orderes} = useQuery('orderList', () => getOrderApi());

    const [tab, setTab] = useState('all');
    const status = [
        { tab: 'all', title: 'Tất cả' },
        { tab: 'pending', title: 'Chờ thanh toán' },
        { tab: 'processing', title: 'Đang xử lý' },
        { tab: 'preparing', title: 'Đang chuẩn bị' },
        { tab: 'delivering', title: 'Đang chuẩn bị' },
        { tab: 'completed', title: 'Hoàn thành' },
        { tab: 'canceled', title: 'Đã huỷ' },
    ]
    
    return (
        orderes &&
        <div>
            <div className=" text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                        {status.map((item, i) => (
                            <li key={i} onClick={() => setTab(item.tab)} className="me-2">
                                <div className={`
                            ${tab === item.tab ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500"
                                        : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    } inline-block p-4 `}>
                                    {item.title}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            <div className="relative  shadow-md sm:rounded-lg">
                <OrderTable orderes={orderes} type={tab} />
            </div>
        </div>

    );
};
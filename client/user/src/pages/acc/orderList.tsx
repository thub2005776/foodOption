import React, { useState } from "react";
import { selectUser } from "../../features/userSlice";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getOrderByUidApi } from "../../api/orderApi";
import { Orderes, Sidebar } from "../../components";



export default function OrderList() {
    const user = useSelector(selectUser);

    const { data: orderes } = useQuery('orderes', () => getOrderByUidApi(user && user['_id'] && user['_id'].$oid))
    
    const [tab, setTab] = useState('all');
    const status = [
        { tab: 'all', title: 'Tất cả' },
        { tab: 'pending', title: 'Chờ duyệt' },
        { tab: 'processing', title: 'Đang xử lý' },
        { tab: 'preparing', title: 'Đang chuẩn bị' },
        { tab: 'delivering', title: 'Đang giao hàng' },
        { tab: 'delivered', title: 'Hoàn thành' },
        { tab: 'canceled', title: 'Đã huỷ' },
    ]

    return (
        user && orderes &&
        <div className="">
            {/* sidebar */}
            <Sidebar tab="order"/>

            <div className="p-4 sm:ml-64 ">
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
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
                {/* OrderList */}
                <Orderes type={tab} orderes={orderes} />
            </div>
        </div>
    )
}
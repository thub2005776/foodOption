import React, { useState } from "react";
import { OrderItem } from "../../components";

export default function OrderTable({ orderes, type }: { orderes: Array<Object>, type: string }) {
    const [more, setMore] = useState(10);
    const orderesFilter = Array.isArray(orderes) && orderes.filter(f => f['status'] === type || type === 'all');
    const orderesSeeMore = Array.isArray(orderesFilter) && orderesFilter.length > more ?
        orderesFilter.slice(0, more) : orderesFilter;


    const handleSeeMore = () => {
        setMore(more * 2);
    }
    return (
        orderesFilter &&
        <div className="">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="row" className="p-4 py-3">
                            Thời gian
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Trang thái
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mã hoá đơn
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thành tiền
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thanh toán
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thêm
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(orderesSeeMore) && orderesSeeMore.map((item, i) => (
                        <OrderItem key={i} item={item} />
                    ))}
                </tbody>
            </table>
            {orderesFilter.length > more &&
            <button
            onClick={handleSeeMore}
                type="button"
                className="float-right py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Xem thêm
            </button>}
        </div>
    );
};
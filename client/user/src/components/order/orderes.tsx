import React from "react";
import { DateTimeDisplay, Status, FoodItem } from "../../components";

export default function Orderes({ type, orderes }: { type: string, orderes: Array<Object> }) {
    const orderesFilter = orderes.filter(f => f['status'] === type || type === 'all');
    console.log(orderesFilter);
    
    return (
        <div className="mx-10 m-5">
            {Array.isArray(orderesFilter) && orderesFilter.length > 0 ? orderesFilter.map((item, i) => (
                <div key={i} className="mb- p-2 rounded-md shadow-sm bg-gray-100 dark:bg-gray-800">
                    <div className="flex justify-between p-4 text-gray-900 dark:text-white  border-b-[0.5px]">
                        <p className="text-gray-600 dark:text-white">
                            Thời gian đặt hàng:
                            <DateTimeDisplay datetime={item['updatedAt']} />
                        </p>
                        <div className="flex">
                            <Status status={item['status']} />
                        </div>
                    </div>
                    <ul className="">
                        {Array.isArray(item['detail']) && item['detail'].map((foodItem, i) => (
                            <FoodItem key={i} foodItem={foodItem} total={item['total']} />
                        ))}
                    </ul>
                </div>
            ))
            : <p className="text-gray-600 text-center mt-28">Chưa có đơn hàng nào</p>}

        </div>
    );
};
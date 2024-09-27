import React from "react";
import { CartItem } from "../../components";

export default function Cart() {

    return (
        <div className="lg:mx-20 mx-10">
            <div className="flex gap-5">
                <div className="flex items-center">
                    <input checked id="checked-checkbox" type="checkbox" value="" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                </div>
                <div>
                    
                </div>
                <CartItem item={{
                    food: {
                        price: '25.000',
                        name: 'abc'
                    },
                    quantity: 2,
                    note: 'abc',
                }} />
            </div>
            <div className="flex justify-between p-2 bg-blue-100 dark:bg-blue-500 rounded-b-lg">
                <p className="text-blue-700 font-bold dark:text-white"><span className="py-0.5 px-2 rounded-full bg-green-500 text-white">1</span> Đã chọn</p>
                <div className="flex justify-center gap-2">
                    <p className="text-red-600 dark:text-red-100 font-semibold">25.000đ</p>
                    <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
};
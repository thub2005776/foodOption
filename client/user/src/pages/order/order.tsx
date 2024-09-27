import React from "react";
import { AddressModal, CartItem } from "../../components";

export default function Order() {
    return (
        <div className="lg:mx-20 mx-10">
            {/* address */}
            <div className="mb-10">
                <div className="flex gap-5">
                    <svg className="w-10 h-10 text-red-600 dark:text-red-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-900 font-bold text-2xl dark:text-white">
                        Địa chỉ nhận hàng
                    </p>
                </div>
                <div className="p-4 shadow-md flex justify-between">
                    <p className="text-gray-600">
                        124/11B, Đ.Mạc Thiên Tích, P.Xuân Khánh, Q.Ninh Kiều, Tp.Cần Thơ
                    </p>
                    <AddressModal />
                </div>
            </div>
            {/* Food list */}
            <div className="mb-10">
                <div className="flex gap-5 mb-3">
                    <svg className="w-10 h-10 text-green-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-900 font-bold text-2xl dark:text-white">
                        Danh sách món ăn
                    </p>
                </div>
                <div className="">
                    <CartItem item={{
                        food: {
                            price: '25.000',
                            name: 'abc'
                        },
                        quantity: 2,
                        note: 'abc',
                    }} />

                </div>
            </div>


            {/* Delivery */}
            {/* address */}
            <div className="mb-10">
                <div className="flex gap-5">
                    <svg className="w-10 h-10 text-orange-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>

                    <p className="text-gray-900 font-bold text-2xl dark:text-white">
                        Thông tin giao hàng
                    </p>
                </div>
                <div className="p-4 shadow-md flex justify-between">
                    <p className="text-gray-600">
                        124/11B, Đ.Mạc Thiên Tích, P.Xuân Khánh, Q.Ninh Kiều, Tp.Cần Thơ
                    </p>
                    <AddressModal />
                </div>
            </div>
            {/* Total */}
            <div className="mb-10">
                <div className="flex gap-5">
                    <svg className="w-10 h-10 text-rose-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M5 14a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                    </svg>

                    <p className="text-gray-900 font-bold text-2xl dark:text-white">
                        Tổng cộng
                    </p>
                </div>
                <div className="p-4 shadow-md flex justify-between">
                    <p className="text-gray-600">
                        124/11B, Đ.Mạc Thiên Tích, P.Xuân Khánh, Q.Ninh Kiều, Tp.Cần Thơ
                    </p>
                    <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Thanh toán
                        </button>
                </div>
            </div>


        </div>
    );
};
import React, { useState } from 'react';
import {  DateTimeDisplay, OrderDisplay, TimeLater } from '../../components';


export default function OrderForm({ check }: { check: Object }) {

    const [address, setAddress] = useState(check['address']);

    return (
        check &&
        <div className="mx-10">
            <div className='w-full'>
                <p className='text-gray-600 font-semibold mb-6 text-2xl'>Thông tin món ăn</p>
                <div className="mb-5">
                    <OrderDisplay order={check} />
                </div>
                <p className='text-gray-600 font-semibold text-2xl'>
                    Phương thức thanh toán:
                    <span className=''>{check['payment'] === 'cash' ? ' Tiền mặt' : ' Chuyển khoản qua Paypal'}</span>
                </p>


                <div className='mb-5'>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Đã tạo lúc:
                        <DateTimeDisplay datetime={check['createdAt']['$date']} />
                    </p>
                </div>
                <div className='mb-5'>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Đã cập nhật lúc:
                        <DateTimeDisplay datetime={check['updatedAt']['$date']} />
                    </p>
                </div>
            </div>
            <div className='w-full'>
                <p className='text-gray-600 font-semibold mb-6 text-2xl'>Thông tin giao hàng</p>
                <div className='mb-5'>
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Thời gian giao hàng (dự kiến)
                    </label>
                    <TimeLater dateTime={check['updatedAt']['$date']} minutes={15} />
                </div>
                <div className='mb-5'>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Địa chỉ giao hàng
                    </label>
                    <div className='h-24 border border-blue-400 dark:border-gray-600 rounded-lg shadow'>
                        <div>
                            <p className="text-gray-900 dark:text-white font-bold">{address['username']} |
                                <span className="text-gray-600 font-bold">(+84) {address['phone']}</span>
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-gray-600">{address['address']}</p>
                                <p className="text-green-500">{address['actived'] ? 'Mặc định' : ''}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
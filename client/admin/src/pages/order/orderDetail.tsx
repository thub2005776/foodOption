import React from 'react';
import { OrderForm, UserForm } from '../../components';

export default function OrderDetail() {
    return (
        <div className='mx-10'>
             <p className="text-2xl text-center mb-6 font-bold tracking-tight text-gray-900 dark:text-white">
                    Thông tin Đơn hàng
                </p>
            <div className='md:flex md:justify-center md:gap-5 mb-6'>
                <div>
                  <p className="text-gray-600 font-semibold">
                    Thông tin khách hàng
                </p>
                <UserForm />  
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    Thông tin nhân viên
                </p>
                <UserForm />  
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    Thông tin vận chuyển
                </p>
                <UserForm />  
                </div>
            </div>

            <OrderForm />
        </div>
    );
}
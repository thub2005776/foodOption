import React from 'react';
import { useLocation } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

import { BackButton, OrderForm, UserForm } from '../../components';
import { useQuery } from 'react-query';
import { getOrderByIdApi } from '../../api/orderApi';

export default function OrderDetail() {
  const user = useSelector(selectUser);
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const { data: order } = useQuery(id, () => getOrderByIdApi(id));

  return (
    user && order &&
    <div className='mx-10'>
      <BackButton />
      {order['_id']?
      <div>
        <p className="text-2xl text-center mb-6 font-bold tracking-tight text-gray-900 dark:text-white">
          Thông tin Đơn hàng
        </p>
        <div className='md:flex md:justify-center md:gap-5 mb-6'>
          <div>
            <p className="text-gray-600 font-semibold">
              Thông tin khách hàng
            </p>
            <UserForm userID={order['userID']} orderID={order['_id'].$oid} type='user' />
          </div>
          <div>
            <p className="text-gray-600 font-semibold">
              Thông tin nhân viên
            </p>
            <UserForm userID={order['staffID']} orderID={order['_id'].$oid} type='staff' />
          </div>
          <div>
            <p className="text-gray-600 font-semibold">
              Thông tin vận chuyển
            </p>
            <UserForm userID={order['deliverymanID']} orderID={order['_id'].$oid} type='deliveryman' />
          </div>
        </div>

        <OrderForm check={order} />
      </div>: <p className='text-center text-3xl font-extrabold text-gray-600 py-20'>Đơn hàng không tồn tại</p>}
    </div>

  );
}
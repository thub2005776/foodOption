import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Statistic, Rate } from 'antd';

import { selectUser } from "../../features/userSlice";
import { getOrderByIdApi, updateOrderApi } from "../../api/orderApi";

import { AddressModal, OrderItem, DateTimeDisplay, Delete, SelectAddressModal, AddressDisplay, Proccess } from "../../components";
import { useMutation, useQuery } from "react-query";
import { getAddressByUidApi } from "../../api/user";
import { updateStoredFoodApi } from "../../api/foodApi";


export default function Ordered() {
    const user = useSelector(selectUser);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const navigate = useNavigate();
    const desc = ['Rất tệ', 'Không hài lòng', 'OK', 'Hài lòng', 'Tuyệt vời'];

    const { data: order } = useQuery(id, () => getOrderByIdApi(id));
    const { data: address } = useQuery(`${id}_address`, () => getAddressByUidApi(user['_id'] && user['_id'].$oid, 'user'))

    const foodList = order && order['detail'];
    const defaltAddress = Array.isArray(address) && address.find(f => f['actived'])

    const [selectedAddress, setSelectedAddress] = useState(order && order['address'] ? order['address'] : defaltAddress)

    const total = () => {
        var t = 0;
        if (Array.isArray(foodList)) {
            foodList.forEach((item) => {
                t += Number(item['food'].price) * item['quantity']
            })
        }
        return t;
    }

    const handleUpdated = (res: string) => {
        setSelectedAddress(Array.isArray(address) && address.find(f => f['_id'].$oid === res))
    }

    const processing = useMutation(
        updateOrderApi, {
        onSuccess(data, variables, context) {
            if (data === "successfull") {
                console.log(data);

            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    }
    )

    const handleChanged = () => {
        const orderValues = {
            id: id,
            address: selectedAddress,
            total: total(),
            updatedAt: Date(),
        }

        processing.mutate(orderValues);

    }

    const updatedStoredFood = useMutation(
        updateStoredFoodApi, {
        onSuccess(data, variables, context) {
            if (data !== "successfull") {
                console.log(data);

            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    })

    const updatedStatus = useMutation(
        updateOrderApi, {
        onSuccess(data, variables, context) {
            if (data === "successfull") {
                navigate('/trend')
            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    }
    )

    const handleCancel = (res: boolean) => {
        if (res) {
            Array.isArray(order['detail']) && order['detail'].forEach(e => {
                const foodValues = {
                    id: e['food']['_id'].$oid,
                    quantity: e['quantity'],
                    operation: '+',
                }
                updatedStoredFood.mutate(foodValues);
            })
            const checkValues = {
                id: order['_id'].$oid,
                updatedAt: Date(),
                status: { status: 'canceled', time: Date() },
            }

            updatedStatus.mutate(checkValues);
        }
    }

    return (
        user && order && address &&
        <div className="lg:mx-20 mx-10">
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white text-center m-10">
                HOÁ ĐƠN
            </p>

            <button type="button" className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate(`/trend`)}>
                <svg className="w-6 h-6text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                </svg>
                Tiếp tục đặt món
            </button>

            <Proccess status={order['status']} />
            {/* address */}
            <div className="mb-10 shadow-md">
                <div className="flex justify-between">
                    <div className="flex gap-5">
                        <svg className="w-10 h-10 text-red-600 dark:text-red-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                        </svg>
                        <p className="text-gray-900 font-bold text-2xl dark:text-white">
                            Địa chỉ nhận hàng
                        </p>
                    </div>
                    {!order['address'] && (order['status'] === 'pending' || order['status'] === 'processing') &&
                        <AddressModal type="add" addressItem={{}} />}
                </div>

                {/* edit address */}
                {(selectedAddress || order['address']) &&
                    <div>
                        {(order['status'] === 'pending' || order['status'] === 'processing') &&
                            <SelectAddressModal address={address} updated={handleUpdated} />}
                        <AddressDisplay address={selectedAddress || order['address']} />
                    </div>}
            </div>

            {/* Review */}
            {order['rating'] &&
                <div className="mb-10">
                    <div className="flex gap-5">
                        <svg className="w-10 h-10 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                        </svg>
                        <p className="text-gray-900 font-bold text-2xl dark:text-white">
                            Đánh giá
                        </p>
                    </div>
                    <div className="p-4 shadow-md">
                        <div className='flex justify-center gap-4 p-2 mb-6'>
                            <Rate tooltips={desc} value={order['rating']} />
                            {order['rating'] ? <span> {desc[order['rating'] - 1]}</span> : null}
                        </div>
                    </div>
                </div>}

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
                    {foodList.map((item: Object, i: React.Key) => (
                        <OrderItem key={i} order={order} item={item} index={i} />
                    ))}
                </div>
            </div>

            {/* Payment */}
            <div className="mb-10">
                <div className="flex gap-5">
                    <svg className="w-10 h-10 text-orange-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>

                    <p className="text-gray-900 font-bold text-2xl dark:text-white">
                        Phương thức thanh toán
                    </p>
                </div>
                <div className="p-4 shadow-md">
                    <div className="inline-flex items-center justify-between w-fit p-5 bg-white border  rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 border-blue-600 text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">
                                {order['payment'] === "transfer" ? "Chuyển khoản" : "Tiền mặt"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery */}
            <div className="mb-10">
                <div className="flex gap-5">
                    <svg className="w-10 h-10 text-orange-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>

                    <p className="text-gray-900 font-bold text-2xl dark:text-white">
                        Thông tin giao hàng
                    </p>
                </div>
                <div className="p-4 shadow-md">
                    <p className="text-gray-600 dark:text-white">
                        Thời gian chuẩn bị món ăn: Khoảng 10 phút
                    </p>
                    <p className="text-gray-600 dark:text-white">
                        Thời gian đặt hàng:
                        <DateTimeDisplay datetime={order['createdAt']} />
                    </p>
                    <p className="text-gray-600 dark:text-white">
                        Đơn vị giao hàng: Nhân viên gần bạn nhất của Foodopt
                    </p>

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
                    <p className="mb-3 font-bold text-red-600 dark:text-red-500">
                        <Statistic valueStyle={{ color: '#e02424' }} value={total()} suffix="đ" />
                    </p>
                    {(order['status'] === 'pending' || order['status'] === 'processing') &&
                        <div className="flex ">
                            <Delete name='Đơn hàng' action="Huỷ" res={handleCancel} />
                            <button
                                onClick={handleChanged}
                                type="button"
                                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Lưu thay đổi
                            </button>
                        </div>}
                </div>
            </div>
        </div>
    );
};
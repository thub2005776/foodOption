import React from 'react'
import { updateOrderApi } from '../../api/orderApi';
import { useMutation } from 'react-query';
import { Link } from "react-router-dom";
import { Statistic, message } from 'antd';
import { DateTimeDisplay, Status, FoodItem, Delete, ReviewModal } from "../../components";
import { updateFoodApi, updateStoredFoodApi } from '../../api/foodApi';

export default function Check({ item }: { item: Object }) {
    const [messageApi, contextHolder] = message.useMessage();

    const statusName = Array.isArray(item['status']) && item['status'][item['status'].length - 1]['status'];

    const completedCondition = ['delivering'];
    const notCompletedCondition = ['processing', 'preparing'];
    const reviewCondition = ['delivered'];

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

    const handleCancel = (res: boolean) => {
        if (res) {
            Array.isArray(item['detail']) && item['detail'].forEach(e => {
                const foodValues = {
                    id: e['food']['_id'].$oid,
                    quantity: e['quantity'],
                    operation: '+',
                }
                updatedStoredFood.mutate(foodValues);
            })

            const checkValues = {
                id: item['_id'].$oid,
                updatedAt: Date(),
                status: 'canceled',
            }

            updatedStatus.mutate(checkValues);
        }
    }

    const updatedSold = useMutation(
        updateFoodApi, {
        onSuccess(data, variables, context) {
            if (data === "successfull") {
                console.log(data);
            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    }
    )

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Xác nhận đã nhận hàng thành công!',
        });
    };

    const updatedStatus = useMutation(
        updateOrderApi, {
        onSuccess(data, variables, context) {
            if (data === "successfull") {
                document.location.reload()
            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    }
    )
    const handleCompleted = () => {
        Array.isArray(item['detail']) && item['detail'].forEach(e => {
            const foodValues = {
                id: e['food']['_id'].$oid,
                sold: e['quantity'],
            }

            updatedSold.mutate(foodValues);
        })

        const checkValues = {
            id: item['_id'].$oid,
            updatedAt: Date(),
            newStatus: { status: 'delivered', time: Date() },
        }
        success()
        updatedStatus.mutate(checkValues);

    }
    return (
        <div className="mb-6 p-2 rounded-md shadow-sm bg-gray-100/60 dark:bg-gray-800">
            {contextHolder}
            <div className="flex justify-between p-4 text-gray-900 dark:text-white  border-b-[0.5px] dark:border-gray-600">
                <div>
                    <p className="text-gray-600 dark:text-white">
                        Mã đơn hàng: {item['_id']['$oid']}
                    </p>
                </div>

                <div className='flex'>
                    <div className="flex">
                        <Status status={item['status']} />
                    </div>
                    {reviewCondition.find(f => f === statusName) &&
                        <ReviewModal check={item} />}
                </div>

            </div>
            <ul className="">
                {Array.isArray(item['detail']) && item['detail'].map((foodItem, i) => (
                    <FoodItem key={i} foodItem={foodItem} />
                ))}
            </ul>

            <div className='flex justify-between'>
                <div>
                    <p className="text-gray-600 dark:text-white">
                        Thời gian đặt hàng:
                        <DateTimeDisplay datetime={item['createdAt']['$date']} />
                    </p>
                    {statusName === 'delivered' &&
                        <p className="text-gray-600 dark:text-white">
                            Thời gian nhận hàng:
                            <DateTimeDisplay datetime={item['updatedAt']['$date']} />
                        </p>}
                </div>
                <div className="text-right">
                    <p>Thành tiền: </p>
                    <div className="font-bold text-red-600 dark:text-red-500">
                        <Statistic valueStyle={{ color: '#e02424' }} value={item['total']} suffix="đ" />
                    </div>
                    <div className="flex justify-end">
                        {(statusName === 'pending' || statusName === 'processing') &&
                            <Delete name='Đơn hàng' action='Huỷ' res={handleCancel} />}
                        {completedCondition.find(f => f === statusName) &&
                            <button
                                onClick={handleCompleted}
                                type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Đã nhận hàng
                            </button>}

                        {notCompletedCondition.find(f => f === statusName) &&
                            <button type="button" className="text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center" disabled>
                                Đã nhận hàng
                            </button>}
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <Link to={`/ordered/${item['_id'].$oid}`}> Chi tiết</Link>
                        </button>

                    </div>

                </div>
            </div>

        </div>

    );
};
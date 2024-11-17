import React, { useState } from "react";
import { Rankings, TopicsRankings } from "../../components";
import { useQuery } from "react-query";
import { getOrderApi } from "../../api/orderApi";
import { getReviewApi } from "../../api/reviewApi";
import { getUserApi } from "../../api/user";
import { getFoodApi, getTopicSum } from "../../api/foodApi";

export default function Main() {
    const {data: order} = useQuery('order', () => getOrderApi());
    const {data: review} = useQuery('review', () => getReviewApi());
    const {data: user} = useQuery('user', () => getUserApi('user'));
    const {data: staff} = useQuery('staff', () => getUserApi('staff'));
    const {data: supplier} = useQuery('supplier', () => getUserApi('supplier'));
    const {data:food} = useQuery('food', () => getFoodApi());
    const {data:topicSum} = useQuery('topicsum', () => getTopicSum());

    const topTopic = Array.isArray(topicSum) && topicSum.sort((a:Object, b:Object) => b['sum'] - a['sum'])
    
    return (
        Array.isArray(order) && 
        Array.isArray(review) && 
        Array.isArray(user) && 
        Array.isArray(staff) && 
        Array.isArray(supplier) && 
        Array.isArray(food) && 
        Array.isArray(topTopic) && 
        <div className=" ">
            <div>
                <div className="w-full mb-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className=" border-gray-200 dark:border-gray-600">
                        <div className="p-8 bg-white rounded-lg dark:bg-gray-800">
                            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">{order.length}</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Đơn hàng</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">{review.length}</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Đánh giá</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">{user.length}</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Khách hàng</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">{staff.length}</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Nhân viên</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">{supplier.length}</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Nhà cung cấp</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <Rankings type="TOP MÓN ĂN NỔI BẬT" food={food}/>
            <TopicsRankings type="TOP CHỦ ĐỀ NỔI BẬT" food={topTopic} />
        </div>
    )
}
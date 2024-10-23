import React, { useState } from "react";
import { Statistic } from 'antd';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useMutation, useQuery } from "react-query";
import { Rating, TagBage } from "../../components";
import { downloadApi } from "../../api/uploadFileApi";
import { addOrderApi } from "../../api/orderApi";
import { updateCartFoodApi } from "../../api/cartApi";

export default function FoodDetail({ food }: { food: Object }) {
    const user = useSelector(selectUser);
    const { data: imageFile } = useQuery(food && food['image'] ? food['image'] : 'food.jpg',
        () => downloadApi(food && food['image'] ? food['image'] : 'food.jpg'));

    
    const navigate = useNavigate();


    const addOrder = useMutation(
        addOrderApi, {
        onSuccess(data, variables, context) {
            if (data['acknowledged']) {
                navigate(`/order/${data['inserted_id']}`)

            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    })

    const handleOrdered = () => {
        if (user) {
            const values = {
                userID: user['_id'].$oid,
                address: user['address'],
                detail: [{
                    food: food,
                    quantity: 1,
                    note: '',
                }],
                createdAt: Date(),
                updatedAt: Date(),
                payment: 'cash',
                status: [{status: 'pending', time: Date()}],
            }

            addOrder.mutate(values)

        } else { alert('Hãy đăng nhập trước khi đặt món.') }
    }


    const addCart = useMutation(
        updateCartFoodApi, {
        onSuccess(data, variables, context) {
            if (data === "successfull") {
                alert('Đã thêm vào giỏ hàng')
            }
        },
        onError(error, variables, context) {
            console.log(error);
        },
    })

    const handleAddCart = () => {
        if (user) {
            const values = {
            userID: user['_id'].$oid,
            foodID: food['_id'].$oid,
            element: { food: food, quantity: 1, note: '' },
            updatedAt: Date(),
        }
        addCart.mutate(values);
        } else { alert('Hãy đăng nhập trước khi thêm vào giỏ hàng.') }
        

    }
    const image = 'https://i.pinimg.com/564x/e0/62/8b/e0628ba2516d4000328adfe8d0ca2088.jpg';
    return (
        food  && imageFile &&
        <div className="mb-6 md:flex justify-center gap-10">
            <div className="relative flex-auto w-[30rem]">
                <img className=" rounded-md"
                    src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : image} alt="food"
                />
            </div>

            <div className="lg:block sm:flex gap-5 w-full">
                <div>
                    <dl className="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className=" flex flex-col pb-3">
                            <dt className="mb-1 text-gray-900 text-3xl font-bold dark:text-white">
                                {food['name']}
                            </dt>
                            <Rating foodID={food['_id'] && food['_id']['$oid']} />
                        </div>
                        <div className=" flex flex-col pb-3">
                            <dt className="mb-1 text-red-600 text-3xl font-bold dark:text-red-500">
                                <Statistic valueStyle={{ color: '#e02424' }} value={food['price']} suffix="đ" />
                            </dt>
                            <p>{food['sold']} Lượt bán</p>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                Mô tả
                            </dt>
                            <dd className="font-semibold ">
                                {food['info']}
                            </dd>
                        </div>
                    </dl>
                    <div className="flex">
                        <button
                            onClick={handleOrdered}
                            type="button"
                            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Mua ngay
                        </button>
                        <button
                            onClick={handleAddCart}
                            className="relative inline-flex items-center justify-center p-2.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                            <span className="relative  transition-all ease-in duration-75 rounded-md bg-opacity-0">
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                </svg>
                            </span>
                            Thêm vào giở hàng
                        </button>
                    </div>

                    <div className="flex gap-2 m-2">
                        {Array.isArray(food['tag']) && food['tag'].map((item, i) => (
                            <TagBage key={i} name={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
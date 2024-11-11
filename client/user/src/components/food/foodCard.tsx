import React from "react";
import { Link } from "react-router-dom";
import { Rating } from '../../components';
import { useMutation, useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Statistic, message } from 'antd';
import { updateCartFoodApi } from "../../api/cartApi";

export default function FoodCard({ food }: { food: Object }) {
    const user = useSelector(selectUser);
    const { data: imageFile } = useQuery(food['image'], () => downloadApi(food['image'] ? food['image'] : 'food.jpg'));

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đã thêm vào giỏ hàng!',
        });
    };
    const addCart = useMutation(
        updateCartFoodApi, {
        onSuccess(data, variables, context) {
            if (data === "successfull") {
                success()
            }
        },
        onError(error, variables, context) {

            console.log(error);
        },
    })

    const handleAddCart = () => {
        const values = {
            userID: user['_id'].$oid,
            foodID: food['_id'].$oid,
            element: { food: food, quantity: 1, note: '' },
            updatedAt: Date(),
        }
        addCart.mutate(values);

    }

    const image = 'https://i.pinimg.com/564x/e0/62/8b/e0628ba2516d4000328adfe8d0ca2088.jpg';
    return (
        food && imageFile &&
        <div className="relative m-1">
            {contextHolder}

            <div className="w-60 h-[27rem] relative p-1 cursor-pointer hover:bg-orange-200 dark:hover:bg-gray-700 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/food/${food['_id']?.$oid}`}>
                    <img className="rounded-t-lg w-60 h-64"
                        src={imageFile instanceof Blob ? URL.createObjectURL(imageFile)
                            : image} alt="food" />


                    <div className="rounded-b-lg p-2">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {food['name']}
                        </h5>
                        <div className="flex justify-between">
                            <p className="mb-3 font-bold text-red-600 dark:text-red-500">
                                <Statistic valueStyle={{ color: '#e02424' }} value={food['price']} suffix="đ" />
                            </p>
                            <p className="text-gray-600">{food['sold']} Lượt bán</p>
                        </div>
                    </div>
                </Link>
                <div className="absolute bottom-2 w-full">
                    <div className="flex justify-around">
                        <Rating foodID={food['_id'].$oid}/>
                        <button
                            onClick={handleAddCart}
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                            <span className="relative  transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                <svg className="w-6 h-6 text-purple-600 hover:text-white  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
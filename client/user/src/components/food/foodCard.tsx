import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FavoritedButton, Rating } from '../../components';
import { useMutation, useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

import { Statistic } from 'antd';
import { addFavoritedFoodApi, deleteFavoritedFoodApi } from "../../api/favoritedFoodApi";

export default function FoodCard({ food }:{ food: Object }) {
    const user = useSelector(selectUser);
    const { data: imageFile } = useQuery(food['image'] ? food['_id'].$oid : 'foodImage', () => downloadApi(food['image'] ? food['image'] : 'food.jpg'));

    const [favoritedID, setFavoritedID] = useState('');

    const addFavoritedFood = useMutation(
        addFavoritedFoodApi, {
            onSuccess(data, variables, context) {
                if (data['acknowledged']) {
                    setFavoritedID(data['inserted_id'])
                    alert('Đã thêm vào yêu thích!');
                }
            },
            onError(error, variables, context) {
                console.log(error);
            },
        }
    )

    const removeFavoritedFood = useMutation(
        deleteFavoritedFoodApi, {
            onSuccess(data, variables, context) {
                if (data === "successfull") {
                    alert('Đã loại bỏ khỏi yêu thích!');
                }
            },
            onError(error, variables, context) {
                console.log(error);
            },
        }
    )

    const handleFavortied = (result: boolean) => {
        const values = {
            userID: user['_id'].$oid,
            foodID: food['_id'].$oid,
            detail: food,
            createdAt: Date(),
            updatedAt: result?  Date(): null,
        }

        if (result) {
            addFavoritedFood.mutate(values);
        } else { removeFavoritedFood.mutate(favoritedID) }

    }

    const image = 'https://i.pinimg.com/564x/e0/62/8b/e0628ba2516d4000328adfe8d0ca2088.jpg';
    return (
        food && imageFile &&
        <div className="relative">
            <div className="absolute z-50 top-5 right-3">
                <FavoritedButton login={user} foodID={food['_id'] && food['_id'].$oid} liked={handleFavortied} />
            </div>
            <Link to={`/food/${food['_id']?.$oid}`}>
                <div className="w-60 h-[26rem] relative p-1 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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

                        <div className="flex justify-around">
                            <Rating
                                rate={food['rating']}
                                amount={0} />
                            
                        </div>
                    </div>

                </div>
            </Link>
        </div>

    )
}
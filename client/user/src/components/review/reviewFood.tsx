import React, { useState } from "react";
import { addReviewApi, getReviewByFIdApi, updateReviewApi } from '../../api/reviewApi';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useMutation, useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { addFavoritedFoodApi, deleteFavoritedFoodApi, getFavoritedFoodByFidApi } from "../../api/favoritedFoodApi";

export default function ReviewFood({ foodList, checkID }: { foodList: Object, checkID }) {
    const user = useSelector(selectUser);
    const { data: imageFile } = useQuery(foodList['food'] && foodList['food']['image'], () => downloadApi(foodList['food']['image'] ? foodList['food']['image'] : 'food.jpg'));
    const { data: review } = useQuery(foodList['food'] && foodList['food']['_id'].$oid, () => getReviewByFIdApi(foodList['food'] && foodList['food']['_id'].$oid));
    const { data: favorited } = useQuery('favortied', () => getFavoritedFoodByFidApi(foodList['food'] && foodList['food']['_id']['$oid']))

    const [comment, setComment] = useState('');
    const [saved, setSaved] = useState(false);
    const [favoritedID, setFavoritedID] = useState(favorited);
    
    const addReiew = useMutation(
        addReviewApi, {
        onSuccess(data, variables, context) {
            if (data === "successfull") {
                console.log(data);
                setSaved(true)
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    }
    )

    const handleAddReview = () => {
        const values = {
            user: user,
            checkID: checkID,
            food: foodList['food'],
            liked: 0,
            comment: comment,
            createdAt: Date(),
            updatedAt: Date(),
        }

        addReiew.mutate(values)
    }

    const addFavoritedFood = useMutation(
        addFavoritedFoodApi, {
        onSuccess(data, variables, context) {
            if (data['$oid']) {
                setFavoritedID(data['$oid'])
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
            }
        },
        onError(error, variables, context) {
            console.log(error);
        },
    }
    )

    const handleFavortied = () => {
        const values = {
            userID: user['_id'].$oid,
            food: foodList['food'],
            createdAt: Date(),
            updatedAt: Date(),
        }


        if (favoritedID) {
            removeFavoritedFood.mutate(favoritedID)
        } else { addFavoritedFood.mutate(values) }

    }

    const likedCSS = "text-white " 
    const disLikeCSS = "text-gray-900 "

    return (
        user && foodList && checkID && imageFile instanceof Blob && review &&
        <div className="shadow-sm mb-6">
            <div className="">
                <div className="flex gap-5">
                    <div className="flex">
                        <img src={URL.createObjectURL(imageFile)} alt="food"
                            className="w-10" />
                        <p className="text-gray-600 font-semibold">{foodList['food']['name']}</p>
                    </div>
                    <button 
                    onClick={handleFavortied}
                    className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800
                    ${favoritedID? likedCSS: disLikeCSS}`}>
                        <span className={`${favoritedID && "bg-opacity-0 "} relative px-5 py-1.5  bg-white dark:bg-gray-900 rounded-md hover:bg-opacity-0`}>
                            Yêu thích
                        </span>
                    </button>
                </div>

                <button
                    onClick={handleAddReview}
                    type="button" className="float-right focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {saved ? "Đã lưu" : "Lưu"}
                </button>

            </div>
            <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea
                        onChange={(e) => {
                            setComment(e.target.value)
                            setSaved(false)
                        }}
                        id="comment" rows={3}
                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        placeholder="Bạn cảm thấy món ăn như thế nào..."
                        defaultValue={review['comment']}></textarea>
                </div>
            </div>
        </div>

    );
};
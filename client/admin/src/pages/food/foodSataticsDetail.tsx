import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { BackButton, FoodStatatics, Rating } from "../../components";
import { getFavoritedFoodByFidApi } from "../../api/favoritedFoodApi";
import { getReviewByFIdApi } from "../../api/reviewApi";
import axios from "axios";

export default function FoodStataticsDetail() {
    const user = useSelector(selectUser);
    const location = useLocation();
    const id = location.pathname.split('/')[3];

    const [food, setFood] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/api/food/${id}`)
            .then(res => {
                setFood(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const { data: imageFile } = useQuery('imageFilefood', () => downloadApi(food ? food['image'] : 'food.jpg'));
    const { data: favorited } = useQuery('fovorited', () => getFavoritedFoodByFidApi(id));
    const { data: review } = useQuery('revirew', () => getReviewByFIdApi(id));
    const image = 'https://i.pinimg.com/564x/7c/1e/fb/7c1efb37634dcfc5d9314177f9c3cd91.jpg';
    return (
        user && food && imageFile && favorited && review &&
        <div className="lg:mx-20 mx-10">
            <BackButton />
            {/* food info */}
            <div className="flex gap-5">
                <div className="w-72">
                    <img src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : image} alt="food"
                        className="w-64 shadow-md rounded-md mb-6" />
                    <div className="flex justify-between">
                        <p className="text-gray-900 dark:text-white text-xl font-semibold">{food['name']}</p>
                        <Rating foodID={id} />
                    </div>

                    <p className="text-gray-600 text-wrap">Mô tả: {food['info']}</p>
                    <p className="text-gray-600">Ngày tạo: {food['createdAt']}</p>
                    <p className="text-gray-600">Ngày cập nhật: {food['updatedAt']}</p>
                    <p className="text-gray-600">Trạng thái: {food['stated'] ? 'Actived' : 'disabled'}</p>
                </div>
                <div className="flex-grow">
                    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
                            <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                                <dl className="flex justify-around gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-teal-400">{food['cost']} đ</dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Chi phí</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-green-400">{food['price']} đ</dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Giá bán</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-blue-600">
                                            {food['stored']}
                                        </dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Số lượng còn lại</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-fuchsia-600">
                                            {food['sold']}
                                        </dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Lượt bán</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-fuchsia-600">
                                            {Array.isArray(favorited) && favorited.length}
                                        </dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Lượt thích</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-fuchsia-600">
                                            {Array.isArray(review) && review.length}
                                        </dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Lượt đánh giá</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    {/* statatics detail */}
                    <FoodStatatics id={id} food={food} />
                </div>
            </div>


        </div>
    );
};
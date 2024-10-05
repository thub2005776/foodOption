import React, { useState } from "react";
import { Rate } from 'antd';
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getFoodByIdApi } from "../../api/foodApi";
import { Comments, FavoritedButton, Rating, TagBage } from "../../components";
import { downloadApi } from "../../api/uploadFileApi";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { addOrderApi } from "../../api/orderApi";

export default function FoodDetail() {
    const user = useSelector(selectUser);
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const { data: food } = useQuery(id, () => getFoodByIdApi(id));
    const {data: imageFile } = useQuery(`${id}_food`, () => downloadApi(food['image']? food['image']:'food.jpg'));
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const handleRated = (num: number) => {
        setRating(num);
    }

    const handleLiked = (result: boolean) => {


    }

    const addOrder = useMutation(
        addOrderApi, {
            onSuccess(data, variables, context) {
                if (data['acknowledged']) {
                    navigate(`/order/${data['inserted_id']}`)
                    
                }
            }, onError(error, variables, context) {
                console.log(error);
                
            },
        }
    )

    const handleOrdered = () => {
        if (user) {

        const values = {
            userID: user['_id'].$oid,
            detail: [{
                food:food,
                quantity: 1,
                note: '',
            }],
            createdAt: Date(),
            stated: 'pre-pending',
        }

        addOrder.mutate(values)

        } else { alert('Hãy đăng nhập trước khi đặt món.')}
    }
    
    const image = 'https://i.pinimg.com/564x/e0/62/8b/e0628ba2516d4000328adfe8d0ca2088.jpg';
    return (
        food && imageFile &&
        <div className="lg:mx-20 mx-10">
            <div className="mb-6 md:flex justify-center gap-10">
                <div className="relative flex-auto w-[30rem]">
                    <img className=" rounded-md"
                        src={imageFile instanceof Blob? URL.createObjectURL(imageFile) : image} alt="food"
                    />
                    <div className="absolute top-5 right-4">
                        <FavoritedButton login={user} liked={handleLiked} />
                    </div>
                </div>

                <div className="lg:block sm:flex gap-5 w-full">
                    <div>
                        <dl className="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className=" flex flex-col pb-3">
                                <dt className="mb-1 text-gray-900 text-3xl font-bold dark:text-white">
                                    {food['name']}
                                </dt>
                                <Rating rate={4.45} amount={35} />
                            </div>
                            <div className=" flex flex-col pb-3">
                                <dt className="mb-1 text-red-600 text-3xl font-bold dark:text-red-500">
                                    {food['price']} đ
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
                        <button 
                        onClick={handleOrdered}
                        type="button"
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                            <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Order
                            </span>
                        </button>
                        <div className="flex gap-2 m-2">
                            {Array.isArray(food['tag']) && food['tag'].map((item, i) => (
                                <TagBage key={i} name={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <dt className="my-7 text-gray-900 text-3xl font-bold dark:text-white">
                    Đánh giá của khách hàng
                </dt>
                <p className="mb-10 text-lg dark:text-white font-semibold">Đánh giá:
                    <span className="ms-5 p-1 rounded-md bg-gray-200 dark:bg-gray-700">
                        <Rate allowHalf defaultValue={rating} onChange={handleRated} />
                    </span>
                </p>


                <Comments com={[{
                image: "https://i.pinimg.com/564x/0a/1f/39/0a1f391965cc20b2dc258bfc6db09705.jpg",
                username: "Bailu",
                date: "11:21",
                content: "Easy!!!"
            },
            {
                image: "https://i.pinimg.com/736x/b1/1c/6f/b11c6ff1267811c3f9b8a10bcbe45778.jpg",
                username: "Caixukun",
                date: "11:14",
                content: "Good!."
            }
            ]} />
            </div>
        </div>
    )
}
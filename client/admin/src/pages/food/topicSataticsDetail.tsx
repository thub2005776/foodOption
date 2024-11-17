import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { BackButton, TopicStatatics } from "../../components";
import axios from "axios";
import { topicStataticsApi } from "../../api/foodApi";

export default function TopicStataticsDetail() {
    const user = useSelector(selectUser);
    const location = useLocation();
    const id = location.pathname.split('/')[3];

    const [topic, setTopic] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/api/topic/${id}`)
            .then(res => {
                setTopic(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const { data: topicSum } = useQuery('topicSum', () => topicStataticsApi(id));
    const { data: imageFile } = useQuery(topic && topic['image'], () => downloadApi(topic ? topic['image'] : 'food.jpg'));
    const image = 'https://i.pinimg.com/564x/7c/1e/fb/7c1efb37634dcfc5d9314177f9c3cd91.jpg';

    console.log(topicSum);
    
    return (
        user && topic && imageFile && topicSum &&
        <div className="lg:mx-20 mx-10">
            <BackButton />
            {/* food info */}
            <div className="flex gap-5">
                <div className="w-72">
                    <img src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : image} alt="topic"
                        className="w-64 shadow-md rounded-md mb-6" />
                    <p className="text-gray-900 dark:text-white text-xl font-semibold">{topic['name']}</p>
                    <p className="text-gray-600">Ngày tạo: {topic['createdAt']}</p>
                    <p className="text-gray-600">Ngày cập nhật: {topic['updatedAt']}</p>
                </div>
                <div className="flex-grow">
                    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
                            <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                                <dl className="flex justify-around gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-teal-400">{topicSum['sum']}</dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Món ăn</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-teal-400">{topicSum['profit']} đ</dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Doanh thu</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-teal-400">{topicSum['order_total']} đ</dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Đơn hàng</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-teal-400">{topicSum['impt_total']} đ</dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Chi phí</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl font-extrabold text-fuchsia-600">
                                            {topicSum['sold']}
                                        </dt>
                                        <dd className="text-gray-500 dark:text-gray-400">Lượt bán</dd>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    {/* statatics detail */}
                    <TopicStatatics id={id} food={topicSum} />
                </div>
            </div>
        </div>
    );
};
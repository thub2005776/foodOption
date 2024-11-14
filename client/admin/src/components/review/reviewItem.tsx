import React, { useState } from "react";
import { DateTimeDisplay, Delete, TimeAgo } from "..";
import { useMutation, useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { Link } from "react-router-dom";
import { deleteReviewApi } from "../../api/reviewApi";

export default function CommItem({ item }: { item: Object }) {
    const [user, setUser] = useState(item['user']);
    const { data: imageFile } = useQuery(user['image'], () => downloadApi(user['image']));
    const image = 'https://i.pinimg.com/564x/72/49/ed/7249ed41cf4ab50c5d37c169786ff768.jpg';

    const deleteReview = useMutation(
        deleteReviewApi, {
            onSuccess(data, variables, context) {
                if(data === 'successfull') {
                    document.location.reload()
                }
            },onError(error, variables, context) {
                console.log(error);
            },
        }
    )
    
    const handleDeleteReiew = (res: boolean) => {
        if(res) {
            deleteReview.mutate(item['_id']['$oid']);
        }
    }
    return (
        item && imageFile &&
        <tr
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img
                    className="w-10 h-10 rounded-full"
                    src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : image} alt="avartar" />
                <div className="ps-3">
                    <div className="text-base font-semibold">{user['name']}</div>
                    <div className="font-normal text-gray-500">{user['phone']}</div>
                </div>
            </th>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                <p className="ms-2 text-sm font-bold text-gray-800  dark:text-white">
                    {item['rating']}
                </p>
                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                </div>
            </td>
            <td className="px-6 py-4">
                {item['comment']}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                   <DateTimeDisplay datetime={item['updatedAt']['$date']} />
                </div>
            </td>
            <td className="px-6 py-4 flex gap-4">
                <Link to={`/order/${item['checkID']}`}>
                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Chi tiết
                    </div>
                </Link>
                <Delete name="Đánh giá" res={handleDeleteReiew} />
            </td>
        </tr>
    )
}
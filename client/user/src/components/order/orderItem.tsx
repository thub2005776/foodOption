import React, { useState } from "react";
import { Statistic } from 'antd';
import { useMutation, useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { updateOrderFoodApi } from "../../api/orderApi";
import { getFoodByIdApi, updateStoredFoodApi } from "../../api/foodApi";
import { getReviewByCIdApi } from "../../api/reviewApi";

export default function OrderItem({ order, item, index }: { order: Object, item: Object, index: React.Key }) {
    const { data: imageFile } = useQuery(item['food'].image, () => downloadApi(item['food'] ? item['food'].image : 'food.jpg'));
    const { data: food } = useQuery(item && item['food']['_id'].$oid, () => getFoodByIdApi(item && item['food'] && item['food']['_id'].$oid))
    const { data: review } = useQuery('review', () => getReviewByCIdApi(order['_id']['$oid']));
    const foodReview = Array.isArray(review) && item && review.find(f => f['food']['_id']['$oid'] === item['food']['_id'].$oid)

    const [quantity, setQuantity] = useState(item && item['quantity']);
    const [note, setNote] = useState(item && item['note']);
    const message = food && food['stored'] ? food['stored'] : '';
    const [err, setErr] = useState('');

    const quantityAndNoteCondition = ['pending', 'processing'];
    const status = Array.isArray(order['status']) && order['status'][order['status'].length -1]['status'];

    const updatedFood = {
        orderID: order && order['_id'].$oid,
        index: index,
        note: note,
        quantity: quantity,
    }

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

    const updatedOrderFood = useMutation(
        updateOrderFoodApi, {
        onSuccess(data, variables, context) {
            if (data !== "successfull") {
                console.log(data);

            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    })

    const handleDesQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setErr('  ')

            updatedFood.quantity = quantity - 1;
            updatedOrderFood.mutate(updatedFood);

            const foodValues = {
                id: food['_id'].$oid,
                quantity: quantity - 1,
                operation: '+',
            }
            updatedStoredFood.mutate(foodValues);
        } else { setErr('Số lượng không thể về 0.') }
    }

    const handleIncQuantity = () => {
        if (quantity < food['stored']) {
            setQuantity(quantity + 1);
            setErr('  ')

            updatedFood.quantity = quantity + 1;
            updatedOrderFood.mutate(updatedFood);

            const foodValues = {
                id: food['_id'].$oid,
                quantity: quantity + 1,
                operation: '-',
            }
            if (food['stored'] >= quantity + 1) {
                updatedStoredFood.mutate(foodValues);
                updatedOrderFood.mutate(updatedFood);
            } else { setErr('Số lượng đã đến giới hạn tối đa.') }

        } else { setErr('Số lượng đã đến giới hạn tối đa.') }
    }



    const image = 'https:i.pinimg.com/564x/62/b0/58/62b05832fae87fdabf74517176f30c1f.jpg';

    return (
        item &&
        <div className="relative w-full shadow-md sm:rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <div className="grid grid-cols-5">
                <div className="p-2">
                    <img
                        className="w-32 rounded-md"
                        src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : image} alt="food" />
                </div>
                <div className="pt-10 font-bold text-xl text-wrap text-gray-900 whitespace-nowrap dark:text-white">
                    {item['food'].name}
                </div>
                <div className="pt-10 font-bold text-red-600 dark:text-red-500">
                    <Statistic valueStyle={{ color: '#e02424' }} value={item['food'].price} suffix="đ" />

                </div>
                <div className="pt-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ghi chú
                    </label>
                    <textarea
                        onChange={(e) => {
                            setNote(e.target.value)
                            updatedFood.note = e.target.value
                            updatedOrderFood.mutate(updatedFood);
                        }}
                        id="message"
                        rows={4}
                        className={`${quantityAndNoteCondition.find(f => f !== status) && "cursor-not-allowed "} block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder="Thêm ghi chú..."
                        readOnly={status !== 'pending' && status !== 'proccessing'}
                        defaultValue={note}></textarea>
                </div>
                <div className="pt-16 ps-5">
                    <div className="flex gap-5 h-fit">
                        {(quantityAndNoteCondition.find( f=> f === status)) &&
                            <div
                                onClick={handleDesQuantity}
                                className="p-1 cursor-pointer rounded-md border border-orange-500 dark:border-orange-400">
                                <svg className="w-6 h-6 text-orange-500" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                                </svg>
                            </div>}
                        <p className="text-gray-900 dark:text-white font-bold text-lg">
                            {quantity}
                        </p>

                        {(quantityAndNoteCondition.find( f=> f === status)) &&
                            <div
                                onClick={handleIncQuantity}
                                className="p-1 cursor-pointer rounded-md bg-orange-500 dark:bg-orange-400">
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                </svg>
                            </div>}
                    </div>
                    {message && <p className="text-sm text-green-600">Còn lại {message} phần ăn</p>}
                    {err && <p className="text-sm text-red-600">{err}</p>}
                </div>
            </div>

            {foodReview &&
                <div className="p-2 m-3">
                    <p className="text-gray-600 font-semibold">Đánh giá của bạn:</p>
                    <p className="text-gray-600">{foodReview['comment']}</p>
                </div>}
        </div>
    );
};
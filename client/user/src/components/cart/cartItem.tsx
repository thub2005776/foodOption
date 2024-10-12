import React, { RefCallback, useState } from "react";
import { Statistic } from 'antd';
import { useMutation, useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { updateOrderFoodApi } from "../../api/orderApi";

export default function CartItem({ userID, item, index, checkedIndex }: { userID: string, item: Object, index: React.Key, checkedIndex: RefCallback<Object> }) {
    const { data: imageFile } = useQuery(item['food'].image, () => downloadApi(item['food'] ? item['food'].image : 'food.jpg'));

    const [quantity, setQuantity] = useState(item && item['quantity']);
    const [note, setNote] = useState(item && item['note']);
    const [isChecked, setIsChecked] = useState(false);
    const [err, setErr] = useState('  ');

    const updatedFood = {
        userID: userID,
        foodID: item['food']['_id'].$oid,
        note: note,
        quantity: quantity,
    }

    const updatedOrderFood = useMutation(
        updateOrderFoodApi, {
        onSuccess(data, variables, context) {
            if (data !== "successfull") {
                console.log(data);

            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    }
    )

    const handleDesQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            setErr('  ')

            updatedFood.quantity = quantity - 1;
            updatedOrderFood.mutate(updatedFood);
        } else { setErr('Số lượng đã về 0.') }
    }

    const handleIncQuantity = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
            setErr('  ')

            updatedFood.quantity = quantity + 1;
            updatedOrderFood.mutate(updatedFood);
        } else { setErr('Số lượng đã đến giới hạn tối đa.') }
    }


    const handleChecked = () => {
        setIsChecked(!isChecked);
        checkedIndex({ index: index, isChecked: !isChecked })
    }

    const image = 'https:i.pinimg.com/564x/62/b0/58/62b05832fae87fdabf74517176f30c1f.jpg';

    return (
        item &&
        <li className="relative grid grid-cols-5 w-full shadow-md sm:rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <div className="p-2">
                <div className="flex gap-2">
                    <input
                        onChange={handleChecked}
                        id={index.toString()}
                        type="checkbox"
                        checked={isChecked}
                        className="w-4 h-4 mt-20 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                    <img
                        className="w-32 rounded-md"
                        src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : image} alt="food" />
                </div>

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
                        updatedOrderFood.mutate(updatedFood);
                    }}
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Thêm ghi chú..."
                    defaultValue={note}></textarea>
            </div>
            <div className="pt-16 ps-5">
                <div className="flex gap-5 h-fit">
                    <div
                        onClick={handleDesQuantity}
                        className="p-1 cursor-pointer rounded-md border border-orange-500 dark:border-orange-400">
                        <svg className="w-6 h-6 text-orange-500" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                        </svg>
                    </div>
                    <p className="text-gray-900 dark:text-white font-bold text-lg">
                        {quantity}
                    </p>
                    <div
                        onClick={handleIncQuantity}
                        className="p-1 cursor-pointer rounded-md bg-orange-500 dark:bg-orange-400">
                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                        </svg>
                    </div>
                </div>
                <p className="text-sm text-red-600">{err}</p>
            </div>
        </li>
    );
};
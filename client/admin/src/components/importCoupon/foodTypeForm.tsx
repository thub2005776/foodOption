import React, { useState } from "react";
import { useMutation } from "react-query";
import { addFoodTypeApi } from "../../api/foodTypeApi";

export default function FoodTypeForm({ foodtype }: { foodtype: Object }) {
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');

    const addFoodType = useMutation(
        addFoodTypeApi, {
            onSuccess(data, variables, context) {
                if (data === 'successfull') {
                    document.location.reload();
                }
            }, onError(error, variables, context) {
                console.log(error);
                
            },
        }
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const values = {
            updated: foodtype['_id'] && foodtype['_id']['$oid'],
            name: name,
            detail: detail,
            createdAt: foodtype['name']? null:Date(),
            updatedAt: Date(),
        }

        addFoodType.mutate(values);
        
    }

    
    return (
        <form className="p-4 rounded-md bg-gray-100 dark:bg-gray-800 md:w-[25rem] w-full" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tên nhóm nguyên liệu
                </label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    defaultValue={foodtype['name']}/>
            </div>
            <div className="mb-5">
                <label htmlFor="detail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Chi tiết
                </label>
                <textarea
                    onChange={(e) => setDetail(e.target.value)}
                    id="detail"
                    rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={foodtype['detail']}></textarea>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
            </button>
        </form>
    );
};
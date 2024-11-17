import React, { useState } from "react";
import { FoodCard } from "../../components";
import { useMutation } from "react-query";
import { foodOptApi } from "../../api/foodApi";

export default function Play() {
    const types = [
        { label: 'Tất cả', key: '0' },
        { label: 'Món chính', key: '10' },
        { label: 'Đồ Uống', key: '20' },
        { label: 'Ăn vặt', key: '30' }
    ]

    const [typeFood, setTypeFood] = useState(types[0].label);
    const [vegatarian, setVegatarian] = useState(false)
    const [age, setAge] = useState('')
    const [food, setFood] = useState([])

    const foodOpt = useMutation(
        foodOptApi, {
        onSuccess(data, variables, context) {
            if (data !== "Body of the request is empty." || data !== "Not found any food details.") {
                setFood(data)
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    }
    )

    const handlePlay = () => {
        const data = {
            age: age.length > 0 ? Number(age) : 18,
            tempt: 30.6,
            type: Number(typeFood),
            vegatarian: vegatarian ? 20 : 10,
        }

        foodOpt.mutate(data)
    }

    return (
        <div className="lg:mx-20 mx-10">
            <div className="mt-10">
                <h1 className="text-center text-black dark:text-white font-extrabold m-5 text-3xl">HÔM NAY ĂN GÌ?</h1>
                <div className="flex justify-around p-4 shadow-md dark:bg-gray-800">
                    <div className="mb-5">
                        <label htmlFor="age" className="block mb-4 font-semibold text-gray-900 dark:text-white">
                            Tuổi của bạn
                        </label>
                        <input
                            onChange={(e) => setAge(e.target.value)}
                            type="text"
                            id="age"
                            className=" border border-gray-300  text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>

                    <div className="w-1/3">
                        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Chọn loại món bạn cần</h3>
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {types.map((item, i) => (
                                <li key={i} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input
                                            onChange={(e) => setTypeFood(e.target.value)}
                                            type="radio"
                                            checked={item.key === typeFood}
                                            value={item.key}
                                            name="list-radio"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {item.label}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="age" className="block mb-4 font-semibold text-gray-900 dark:text-white">
                            Bạn có ăn chay không?
                        </label>

                        <div className="flex items-center p-1 border border-gray-200 rounded dark:border-gray-700">
                            <input
                                onChange={() => setVegatarian(!vegatarian)}
                                id="bordered-checkbox-2"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="bordered-checkbox-2"
                                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ăn chay</label>
                        </div>
                    </div>

                </div>
                <button
                    onClick={handlePlay}
                    type="button"
                    className="mt-5 float-end text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Bắt đầu
                </button>
            </div>
            <div className="mt-5">
                <div className="flex justify-center gap-10 mb-6 mx-auto">
                    <p className="text-center font-bold text-2xl text-blue-700 dark:text-white">
                        Kết quả
                    </p>
                </div>

                {food.length === 0 ?
                    <div className="flex justify-center gap-5">
                        <div role="status" className="flex items-center justify-center h-80 w-64 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status" className="flex items-center justify-center h-80 w-64 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status" className="flex items-center justify-center h-80 w-64 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div> :
                    <div className="flex justify-center gap-2">
                        {food.slice(0,3).map((item, i) => (
                            <FoodCard key={i} food={item} />
                        ))}
                    </div>}

            </div>
        </div>
    )
}
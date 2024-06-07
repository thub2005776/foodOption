import React, { useState } from "react";
import { FoodCard, TagBage } from "../../components";

export default function Play() {
    const [locate, setLocate] = useState('Miền Nam');
    const [typeFood, setTypeFood] = useState('Món chính');
    const [vegatarian, setVegatarian] = useState(false)

    const Selector = ({ type, index }: { type: string, index: Number }) => {
        return (
            <div
                onClick={() => {
                    if (type.includes('Miền')) {
                        setLocate(type)
                    } else setTypeFood(type)
                }}
                className={`${locate === type || typeFood === type ? "bg-green-400 dark:bg-green-500" : "bg-gray-400 dark:bg-gray-600 text-white"} 
                    p-4 cursor-pointer text-center 
                    ${index === 1 ? " rounded-s-md" : index === 3 ? " rounded-e-md" : ""}`}>
                {type}
            </div>
        )
    }

    const handleCancel = (res: Object) => {
        if (res['check']) {
            setVegatarian(true)
        } else {
            setVegatarian(false)
        }

    };

    return (
        <div>
            <div>
                <form className="mx-auto w-fit bg-blue-100 dark:bg-gray-800 px-10 p-5 rounded-lg mb-6">
                    <div className="flex justify-center gap-8">
                        <div className="mb-5">
                            <label htmlFor="age" className="block mb-4 font-semibold text-gray-900 dark:text-white">
                                Tuổi của bạn
                            </label>
                            <input
                                type="text"
                                id="age"
                                className="bg-blue-400 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>

                        <div>
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                                Khu vực
                            </h3>
                            <div className="flex mb-6">
                                <Selector type="Miền Nam" index={1} />
                                <Selector type="Miền Trung" index={2} />
                                <Selector type="Miền Bắc" index={3} />
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                                Loại món ăn
                            </h3>
                            <div className="flex mb-6">
                                <Selector type="Món chính" index={1} />
                                <Selector type="Đồ uống" index={2} />
                                <Selector type="Ăn vặt" index={3} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-8">
                        <div className="mb-6">
                            <TagBage name="Ăn chay" cancel={handleCancel} />
                        </div>
                        <div className="mb-6">
                            <TagBage name="Ăn chay" cancel={handleCancel} />
                        </div>
                        <button type="submit"
                            className=" text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Bắt đầu
                        </button>
                    </div>

                </form>
            </div>
            <div className="">
                <div className="flex justify-center gap-10 mb-6 mx-auto">
                    <p className="text-center font-bold text-2xl text-blue-700 dark:text-white">
                        Kết quả
                    </p>
                    <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                        </svg>
                        Đang phân tích...
                    </button>
                </div>

                <div className="flex justify-center gap-5">
                    <div role="status" className="flex items-center justify-center h-96 w-80 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                </div>
            </div>
        </div>
    )
}
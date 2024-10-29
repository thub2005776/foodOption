import React, { useState } from "react";
import { useQuery } from "react-query";
import { getFoodTypeApi } from "../../api/foodTypeApi";
import { BackButton, FoodTypeForm, FoodTypeItem } from "../../components";

export default function FoodType() {
    const { data: foodtypes } = useQuery('foodtype', () => getFoodTypeApi());

    const [foodtype, setFoodType] = useState(Array.isArray(foodtypes) && foodtypes.length > 0 ? foodtypes[0] : {});
    const [addFoodType, setAddFoodType] = useState(false);


    const handleSetFoodType = (res: Object) => {
        setFoodType(res);
        setAddFoodType(false);
    };

    return (
        foodtypes &&
        <div className="m-10">
            <BackButton />
            <div className="mt-5 sm:flex gap-10">
                {Array.isArray(foodtypes) && foodtypes.length > 0 ?
                    <div className="p-4 sm:w-1/2 mb-6 bg-purple-100 dark:bg-gray-800 dark:boder dark:border-gray-600 rounded-md">
                        {foodtype['name'] && <div>
                            <div className="flex justify-between">
                                <p className="text-purple-800 dark:text-white font-bold text-lg">
                                    {foodtype['name']}
                                </p>

                            </div>
                            <p className="text-gray-900 whitespace-nowrap dark:text-white p-1 bg-white dark:bg-gray-900 rounded-lg">
                                ID: {foodtype['_id']['$oid']}
                            </p>

                        </div>}

                        <div className="mt-6">
                            <div className="flex justify-between">
                                <p className="text-purple-800 dark:text-white font-bold text-lg">
                                    Nhóm nguyên liệu
                                </p>
                            </div>

                            <div className=" overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Tên nhóm
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Mã nhóm
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Chỉnh sửa
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foodtypes.length > 0 && foodtypes.map((item, i) => (
                                            <FoodTypeItem key={i} item={item} selected={handleSetFoodType} />))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    : <p className="text-center text-gray-500 font-semibold">Chưa có nhóm nào</p>}
                {/* food type form */}
                <div>
                    <p className="flex gap-5 mb-6 text-center text-gray-500 font-semibold">
                        Bấm vào
                        <span onClick={() => setAddFoodType(true)}>
                            <svg className="w-8 h-8 text-blue-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857ZM18 14a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        để thêm nhóm nguyên liệu
                    </p>
                    {foodtype && !addFoodType ?
                        <FoodTypeForm foodtype={foodtype} />
                        : <div>

                            <FoodTypeForm foodtype={{}} />
                        </div>
                    }
                </div>
            </div>
        </div>

    );
};
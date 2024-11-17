import React from "react";
import { RankingsItem } from "../../components";

export default function Rankings({type, food}:{type:string, food:Array<Object>}) {
    
    const TopFood = Array.isArray(food) && food.length > 0 && food.slice(0,3);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
            <p className="text-center font-bold text-xl mb-6">{type}</p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Thứ hạng
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Món ăn
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Đánh giá
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Lượt bán
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Chi tiết
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(TopFood) && TopFood.map((item, i) => (
                        <RankingsItem key={i} item={item} index={i} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
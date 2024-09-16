import React from "react";
import { RankingsItem } from "../../components";

export default function Rankings() {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

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
                    </tr>
                </thead>
                <tbody>
                    <RankingsItem />
                </tbody>
            </table>
        </div>
    );
};
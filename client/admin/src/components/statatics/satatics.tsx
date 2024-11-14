import React from "react";
import { useQuery } from "react-query";
import { getProfitApi, getStataticsApi } from "../../api/stataticsApi";
import { ChartFilter } from "../../components";


export default function Statatics() {
    const { data: stataticsByDay } = useQuery('profitinday', () => getProfitApi('day'));
    const { data: stataticsByWeek } = useQuery('staticsByWeek', () => getStataticsApi('week'));
    const { data: stataticsByMonth } = useQuery('staticsByMonth', () => getStataticsApi('month'));
    const { data: stataticsByQuarter } = useQuery('staticsByQuarter', () => getStataticsApi('quarter'));
    const { data: stataticsByYear } = useQuery('staticsByYear', () => getStataticsApi('year'));

    return (
        Array.isArray(stataticsByDay) &&
        <div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        <dl className="flex justify-around gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl font-extrabold text-teal-400">{stataticsByDay[0]['profit']}</dt>
                                <dd className="text-gray-500 dark:text-gray-400">Doanh thu hôm nay</dd>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl font-extrabold text-green-400">{stataticsByDay[0]['perprofit']}%</dt>
                                <dd className="text-gray-500 dark:text-gray-400">Lợi nhuận</dd>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl font-extrabold text-blue-600">
                                    {stataticsByDay[0]['order_total']}
                                </dt>
                                <dd className="text-gray-500 dark:text-gray-400">Đơn hàng hôm nay</dd>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl font-extrabold text-fuchsia-600">
                                    {stataticsByDay[0]['impt_total']}
                                </dt>
                                <dd className="text-gray-500 dark:text-gray-400">Nhập hàng hôm nay</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {Array.isArray(stataticsByDay) &&
            Array.isArray(stataticsByWeek) &&
            Array.isArray(stataticsByMonth) &&
            Array.isArray(stataticsByQuarter) &&
            Array.isArray(stataticsByYear) &&
                <ChartFilter type="all"
                    stataticsByDay={stataticsByDay}
                    stataticsByWeek={stataticsByWeek}
                    stataticsByMonth={stataticsByMonth}
                    stataticsByQuarter={stataticsByQuarter}
                    stataticsByYear={stataticsByYear}
                />}
        </div>
    );
};
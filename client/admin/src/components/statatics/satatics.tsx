import React, { useState } from "react";
import { BarChart, PieChart } from "../../components";
import { useMutation, useQuery } from "react-query";
import { getProfitApi, getStataticsApi, StataticsOptionApi, StataticsYearsApi, } from "../../api/stataticsApi";
import { DatePicker, DatePickerProps, Space } from "antd";
import { MakeOptional } from "@mui/x-charts/internals";
import { BarSeriesType, PieValueType } from "@mui/x-charts";

export default function Statatics() {
    const { data: profitInDay } = useQuery('profitinday', () => getProfitApi('day'));

    // const { data: profitInWeek } = useQuery('profitinweek', () => getProfitApi('week'));

    // const { data: profitInMonth } = useQuery('profitinmonth', () => getProfitApi('month'));

    // const { data: profitInYear } = useQuery('profitinyear', () => getProfitApi('year'));

    const { data: stataticsByWeek } = useQuery('staticsByWeek', () => getStataticsApi('week'));
    const { data: stataticsByMonth } = useQuery('staticsByMonth', () => getStataticsApi('month'));
    const { data: stataticsByQuarter } = useQuery('staticsByQuarter', () => getStataticsApi('quarter'));
    const { data: stataticsByYear } = useQuery('staticsByYear', () => getStataticsApi('year'));

    const filter = [
        { title: "Hôm nay", key: 'day' },
        { title: "Tuần", key: 'week' },
        { title: "Tháng", key: 'month' },
        { title: "Quý", key: 'quarter' },
        { title: "Năm", key: 'year' },
        { title: "Tuỳ chọn", key: 'option' },
    ]

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [timeOption, setTimeOption] = useState([{}]);
    const [years, setYears] = useState([{}]);
    const [times, setTimes] = useState('');
    const [isChecked, setIsChecked] = useState('day');

    const defaultPieChartData = [{ id: 0, value: 100, label: 'Doanh thu' }]
    const [PieChartSeries, setPieChartSeries] = useState<MakeOptional<PieValueType, "id">[]>(defaultPieChartData);

    const onChangeStart: DatePickerProps['onChange'] = (date) => {
        setStart(date && date['$d'])
    };

    const onChangeEnd: DatePickerProps['onChange'] = (date) => {
        setEnd(date && date['$d'])
    };

    const handlefilter = (value: string) => {
        setIsChecked(value);

        if (value === 'day' || isChecked === 'day') {
            setPieChartSeries([
                { id: 0, value: profitInDay['perprofit'], label: 'Lợi nhuận ròng' },
                { id: 1, value: 100 - profitInDay['perprofit'], label: 'Doanh thu' },
            ])
        } else {
            var DataArr = [{}]
            if (value === 'week') {
                DataArr = stataticsByWeek
            } else if (value === 'month') {
                DataArr = stataticsByMonth
            } else if (value === 'quarter') {
                DataArr = stataticsByQuarter
            } else if (value === 'year') {
                DataArr = stataticsByYear
            } else if (value === 'option') {
                DataArr = timeOption
            } else {
                DataArr = years
            }

            if (Array.isArray(DataArr) && DataArr.length > 0 && DataArr[0]['start']) {
                var sumPerProfit = 0;
                var sumProfit = 0;
                DataArr.forEach((element, index) => {
                    sumPerProfit += element['perprofit'];
                    sumProfit += element['profit']
                })

                var perProfit = 0
                if (sumPerProfit !== 0 || sumProfit !== 0) {
                    perProfit = sumPerProfit / sumProfit * 100
                }
                setPieChartSeries([
                    { id: 0, value: perProfit, label: 'Lợi nhuận ròng' },
                    { id: 1, value: 100 - perProfit, label: 'Doanh thu' },
                ])
            }
        }
    }


    const StataticsOption = useMutation(
        StataticsOptionApi, {
        onSuccess(data, variables, context) {
            if (data) {
                setTimeOption(data);
                console.log(data);

                handlefilter('option')
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    }
    )

    const handleStataticsOption = () => {
        const timeValues = {
            start: start,
            end: end,
        }

        StataticsOption.mutate(timeValues);
    }

    const StataticsYears = useMutation(
        StataticsYearsApi, {
        onSuccess(data, variables, context) {
            if (data) {
                setYears(data);
                handlefilter('years')
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    })

    const handleStataticsYears = () => {
        setIsChecked('years');
        StataticsYears.mutate({ times: times });
    }
    return (
        profitInDay && Array.isArray(stataticsByWeek) && Array.isArray(stataticsByMonth) && Array.isArray(stataticsByQuarter) && Array.isArray(stataticsByYear) &&
        <div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        <dl className="flex justify-around gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl font-extrabold text-teal-400">+{profitInDay[0]['profit']}</dt>
                                <dd className="text-gray-500 dark:text-gray-400">Doanh thu hôm nay</dd>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl font-extrabold text-green-400">{profitInDay[0]['perprofit']}%</dt>
                                <dd className="text-gray-500 dark:text-gray-400">Lợi nhuận</dd>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl font-extrabold text-blue-600">
                                    +{profitInDay[0]['order_total']}
                                </dt>
                                <dd className="text-gray-500 dark:text-gray-400">Đơn hàng hôm nay</dd>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl font-extrabold text-fuchsia-600">
                                    -{profitInDay[0]['impt_total']}
                                </dt>
                                <dd className="text-gray-500 dark:text-gray-400">Nhập hàng hôm nay</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-2">
                {/* filter radio */}
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Hiển thị theo:</h3>
                <ul className="mb-6 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {filter.map((item, i) => (
                        <li key={i} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    onChange={(e) => handlefilter(e.target.value)}
                                    id="horizontal-list-radio-license"
                                    type="radio" value={item.key}
                                    checked={isChecked === item.key}
                                    name="list-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.title}</label>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* years */}
                {isChecked === 'year' &&
                    <div className="flex justify-end">
                        <div>
                            <input
                                onChange={(e) => setTimes(e.target.value)}
                                type="number"
                                name="years"
                                className=" w-16 rounded-md text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="years" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Số năm:</label>
                        </div>
                        <button onClick={handleStataticsYears}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                            </svg>
                        </button>
                    </div>}
                {/* option filter */}
                <div className="h-6 mb-10">
                    {isChecked === 'option' &&
                        <div className="flex gap-5 justify-end">
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Từ:
                                </label>
                                <Space direction="vertical">
                                    <DatePicker
                                        size="middle"
                                        onChange={onChangeStart} />
                                </Space>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Đến:
                                </label>
                                <Space direction="vertical">
                                    <DatePicker
                                        size="middle"
                                        onChange={onChangeEnd} />
                                </Space>
                            </div>

                            <button onClick={handleStataticsOption}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                                </svg>
                            </button>
                        </div>}
                </div>

                {/* charts */}
                <div className="p-5 ms-10">
                    {isChecked === 'day' && <BarChart dataset={profitInDay} type={isChecked} />}
                    {isChecked === 'week' && <BarChart dataset={stataticsByWeek} type={isChecked} />}
                    {isChecked === 'month' && <BarChart dataset={stataticsByMonth} type={isChecked} />}
                    {isChecked === 'quarter' && <BarChart dataset={stataticsByQuarter} type={isChecked} />}
                    {isChecked === 'year' && <BarChart dataset={stataticsByYear} type={isChecked} />}
                    {isChecked === 'option' && <BarChart dataset={timeOption} type={isChecked} />}
                    {isChecked === 'years' && <BarChart dataset={years} type={isChecked} />}
                    <PieChart data={PieChartSeries} />
                </div>
            </div>
        </div>
    );
};
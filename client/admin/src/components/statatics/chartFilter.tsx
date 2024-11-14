import React, { useState } from "react";
import { BarChart, PieChart } from "../../components";
import { DatePicker, DatePickerProps, Space } from "antd";
import { MakeOptional } from "@mui/x-charts/internals";
import { BarSeriesType, PieValueType } from "@mui/x-charts";
import { useMutation } from "react-query";
import { FoodStataticsOptionApi, FoodStataticsYearsApi, StataticsOptionApi, StataticsYearsApi } from "../../api/stataticsApi";

export default function ChartFilter({type, stataticsByDay, stataticsByWeek, stataticsByMonth, stataticsByQuarter, stataticsByYear}:{
    type:string, 
    stataticsByDay: any[],
    stataticsByWeek: any[],
    stataticsByMonth: any[],
    stataticsByQuarter: any[],
    stataticsByYear: any[],
}) {

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
                { id: 0, value: stataticsByDay['perprofit'], label: 'Lợi nhuận ròng' },
                { id: 1, value: 100 - stataticsByDay['perprofit'], label: 'Doanh thu' },
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

    // food custom
    const FoodStataticsOption = useMutation(
        FoodStataticsOptionApi, {
        onSuccess(data, variables, context) {
            if (data) {
                setTimeOption(data);
                console.log(data);

                handlefilter('option')
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    })

    const FoodStataticsYears = useMutation(
        FoodStataticsYearsApi, {
        onSuccess(data, variables, context) {
            if (data) {
                setYears(data);
                handlefilter('years')
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    })

    // default
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
    })

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

    const handleStataticsOption = () => {
        const timeValues = {
            id: type,
            start: start,
            end: end,
        }

        if(type === 'all') {
            StataticsOption.mutate(timeValues);
        } else {
            FoodStataticsOption.mutate(timeValues);
        }
    }
    const handleStataticsYears = () => {
        setIsChecked('years');

        if(type === 'all') {
            StataticsYears.mutate({ times: times });
        } else {
            FoodStataticsYears.mutate({ times: times, id: type })
        }
    }

    return(
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
                <div className="p-5 flex ">
                    {isChecked === 'day' && <BarChart dataset={stataticsByDay} type={isChecked} />}
                    {isChecked === 'week' && <BarChart dataset={stataticsByWeek} type={isChecked} />}
                    {isChecked === 'month' && <BarChart dataset={stataticsByMonth} type={isChecked} />}
                    {isChecked === 'quarter' && <BarChart dataset={stataticsByQuarter} type={isChecked} />}
                    {isChecked === 'year' && <BarChart dataset={stataticsByYear} type={isChecked} />}
                    {isChecked === 'option' && <BarChart dataset={timeOption} type={isChecked} />}
                    {isChecked === 'years' && <BarChart dataset={years} type={isChecked} />}
                    {/* <PieChart data={PieChartSeries} /> */}
                </div>
            </div>
    )
}
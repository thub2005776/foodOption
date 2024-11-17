import React, { useState } from "react";
import { DatePicker, DatePickerProps, Space } from "antd";
import { DropdownComponent, TimeFilter } from "../../components";

export default function OrderTable({ orderes, type }: { orderes: Array<Object>, type: string }) {
    const [more, setMore] = useState(10);
    const orderesFilter = Array.isArray(orderes) && orderes.filter(f => f['status'][f['status'].length -1]['status'] === type || type === 'all');
    const orderesSeeMore = () => {
        if (Array.isArray(orderesFilter)) {
            if (orderesFilter.length > more) {
                return orderesFilter.slice(0, more);
            } else {return orderesFilter}
        } else return []
    }



    const handleSeeMore = () => {
        setMore(more * 2);
    }

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const selection = [{ name: 'Mới nhất' }, { name: '1 tuần' }, { name: '1 tháng' }, { name: '3 tháng' }, { name: '1 năm' }];
    const [selected, setSelected] = useState(selection[0].name);
    const handleSelected = (res: string) => {
        setSelected(res);

    }

    const onChangeStart: DatePickerProps['onChange'] = (date) => {
        setStart(date && date['$d'])
    };

    const onChangeEnd: DatePickerProps['onChange'] = (date) => {
        setEnd(date && date['$d'])
    };

    const handleFilterOption = () => {
        setSelected('option');
    }
    return (
        Array.isArray(orderesFilter) &&
        <div className="">
            <div className="flex gap-5">
                <DropdownComponent type={selected} data={selection} selectedItem={handleSelected} />
                <div className="flex gap-5">
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
                    <button onClick={handleFilterOption}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                        </svg>
                    </button>
                </div>
            </div >
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="row" className="p-4 py-3">
                            Thời gian
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Trang thái
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mã hoá đơn
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thành tiền
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thanh toán
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thêm
                        </th>
                    </tr>
                </thead>
                <TimeFilter data={orderesSeeMore()} type="order" selected={selected} start={start} end={end} />
            </table>
            {orderesFilter.length > more &&
                <button
                    onClick={handleSeeMore}
                    type="button"
                    className="float-right py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Xem thêm
                </button>}
        </div>
    );
};
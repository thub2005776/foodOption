import React, { useState } from "react";
import { DropdownComponent, SearchModal, TimeFilter } from "../../components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getImportCouponApi } from "../../api/importCouponApi";
import { DatePicker, DatePickerProps, Space } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";


export default function ImportCouponList() {
    const auth = useSelector(selectUser);
    const { data: impt } = useQuery('importcoupones', () => getImportCouponApi());

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
        impt && auth &&
        <div>
            {(auth['roleDetail'] === 'impt' || auth['roleDetail'] === 'admin') ?
                <div>
                    <div className="flex justify-end gap-5">
                        {/* Search for import coupon */}
                        <SearchModal type="importcoupon" data={impt} />
                        {/* Add new import coupon */}
                        <button>
                            <Link to={`/importcoupon/add`}>
                                <svg className="w-8 h-8 text-blue-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857ZM18 14a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2Z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </button>
                        {/*Going to food type */}
                        <button type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <Link to={`/foodtype`}>
                                <div className="flex">
                                    <p>Nhóm nguyên liệu</p>
                                    <span>
                                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </span>
                                </div>

                            </Link>
                        </button>
                    </div>

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

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Thời gian
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Mã phiếu nhập hàng
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nhà cung cấp
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nhân viên phụ trách
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tổng cộng
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Thêm
                                    </th>
                                </tr>
                            </thead>
                            <TimeFilter data={impt} type="importcoupon" selected={selected} start={start} end={end} />
                        </table>
                    </div>

                </div>
                : <div>
                    <p className="text-center font-bold text-gray-600 py-32">Bạn không đủ quyền hạn truy cập vào đây</p>
                </div>}
        </div>
    );
};
import React, { useState } from "react";
import { DropdownComponent, SearchModal, TimeFilter } from '..';
import { useQuery } from "react-query";
import { DatePicker, DatePickerProps, Space } from "antd";
import { getReviewApi } from "../../api/reviewApi";

export default function ReviewList() {
    const { data: review } = useQuery('reviews', () => getReviewApi());
    const ratingList = ['0-2', '3-4', '5'];

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [openRatingDropdown, setOpenRatingDropdown] = useState(false);
    const [rating, setRating] = useState('Rating');

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

    const RatingFilter = (reviews:Array<Object>) => {
        if(Array.isArray(reviews)) {
            if(rating === '0-2') {
                return reviews.filter(f => f['rating'] < 3)
            } else if(rating === '3-4') {
                return reviews.filter(f => f['rating'] < 5)
            } else if(rating === '3-4') {
                return reviews.filter(f => f['rating'] === 5)
            } else {
                return reviews
            }
        } else return []
        
    }

    return (
        Array.isArray(review) &&
        <div>
            <div className="relative">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
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
                    {/* Search for import coupon */}
                    <SearchModal type="importcoupon" data={review} />
                </div>
                <table className=" shadow-md sm:rounded-lg w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Tài khoản
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <button
                                onClick={() => setOpenRatingDropdown(true)}
                                 className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-md hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
                                    {rating}
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                {/* <!-- Dropdown menu --> */}
                                {openRatingDropdown &&
                                 <div className="absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
                                        {ratingList.map((item, i) => (
                                            <li onClick={() => {
                                                setSelected('rating')
                                                setRating(item)
                                                setOpenRatingDropdown(false)
                                            }} key={i}>
                                                <p className="flex justify-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                    <p className="ms-2 text-sm font-bold text-gray-800  dark:text-white">
                                                        {item}
                                                    </p>
                                                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Đánh giá
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thời gian
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thêm
                            </th>
                        </tr>
                    </thead>
                    <TimeFilter data={RatingFilter(review)} type="review" selected={selected} start={start} end={end} />
                </table>
            </div>
        </div>
    )
}
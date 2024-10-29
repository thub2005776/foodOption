import React, { RefCallback, useState } from "react";
import { useQuery } from "react-query";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space, } from 'antd';
import dayjs from "dayjs";
import { getFoodTypeApi } from "../../api/foodTypeApi";
import { DropdownComponent } from "../../components";

export default function ImportCouponDetail({ detail, index, refCallbackValue }: { detail: Object, index: number, refCallbackValue: RefCallback<Object> }) {
    const { data: foodtype } = useQuery('foodtype', () => getFoodTypeApi());

    const [selected, setSelected] = useState(detail['foodType']? detail['foodType']: 'Nhóm nguyên liệu');
    const [name, setName] = useState(detail['name']? detail['name']:'');
    const [cost, setCost] = useState(detail['cost']? detail['cost']:'');
    const [quantity, setQuantity] = useState(detail['quantity']? detail['quantity']:'');
    const [unit, setUnit] = useState(detail['unit']? detail['unit']:'');
    const [exp, setExp] = useState(detail['exp']? detail['exp']:'');
    const [caution, setCaution] = useState(detail['caution']? detail['caution']:'');

    const detailValue = {
        index: index,
        foodType: selected,
        name: name,
        cost: cost,
        quantity: quantity,
        unit: unit,
        exp: exp,
        caution: caution,
    }


    const unitList = [{ name: 'kg' }, { name: 'lít' }, { name: 'chai' }, { name: 'hộp' }, { name: 'quả' }, { name: 'gói' }, { name: 'miếng/tấm' }, { name: 'thùng' }];

    const handleSelectedFoodtype = (res: string) => {
        setSelected(res);
        refCallbackValue(detailValue);
    }
    const handleSelectedUnit = (res: string) => {
        setUnit(res);
        refCallbackValue(detailValue);
    }

    const onChange: DatePickerProps['onChange'] = (date) => {
        setExp(date && date['$d'])
        detailValue.exp = date['$d']
        refCallbackValue(detailValue);
    };


    return (
        Array.isArray(foodtype) &&
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <DropdownComponent type={selected} data={foodtype} selectedItem={handleSelectedFoodtype} />
            </th>
            <td className="px-6 py-4">
                <input
                    onChange={(e) => {
                        setName(e.target.value)
                        refCallbackValue(detailValue)}}
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    defaultValue={detail['name']} />
            </td>
            
            <td className="px-6 py-4">
                <input
                    onChange={(e) =>{ 
                        setQuantity(e.target.value)
                        refCallbackValue(detailValue)}}
                    type="number"
                    id="quantity"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    defaultValue={detail['quantity']} />
            </td>
            <td className="px-6 py-4">
                <DropdownComponent type={unit} data={unitList} selectedItem={handleSelectedUnit} />
            </td>
            <td className="px-6 py-4">
                <input
                    onChange={(e) => {
                        setCost(e.target.value)
                        refCallbackValue(detailValue)}}
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    defaultValue={detail['cost']} />
            </td>
            <td className="px-6 py-4">
                <textarea
                    onChange={(e) => {
                        setCaution(e.target.value)
                        refCallbackValue(detailValue)}}
                    id="cauution"
                    rows={2} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={detail['caution']}></textarea>
            </td>
            <td className="px-6 py-4">
                <Space direction="vertical">
                    <DatePicker
                        defaultValue={exp.length > 0 ? dayjs(exp) : null}
                        size="middle"
                        onChange={onChange} />
                </Space>
            </td>
        </tr>
    )
}
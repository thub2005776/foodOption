import React, { useState } from "react";
import { AddressModal, Delete } from "../../components";

export default function AddressItem({ item }: { item: Object }) {

    const handleDelete = (res: boolean) => {

    } 
    return (
        <li
            className="shadow-sm m-6 p-4">
            <div>
                <p className="text-gray-900 dark:text-white font-bold">{item['username']} |
                    <span className="text-gray-600 font-bold">(+84) {item['phone']}</span>
                </p>
            </div>
            <div className="flex justify-between">
                <div>
                    <p className="text-gray-600">{item['address']}</p>
                    <p className="text-green-500">{item['actived'] ? 'Mặc định' :''}</p>
                </div>
                <div className="flex ">
                    <AddressModal type="edit" addressItem={item}/>
                    <Delete res={handleDelete} action="Xoá" name="Địa chỉ"/>
                </div>
            </div>
        </li>
    )
}
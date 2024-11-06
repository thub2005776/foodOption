import React, { useState } from "react";
import { AddButton, Item, SearchModal } from "../../components";

export default function List({ title, data, type, id }: { title: Array<string>, data: Array<Object>, type: string, id:string }) {
    const [selected, setSeleted] = useState(title && title.length > 0 && title[0]['_id'].$oid);
    
    const dataFilter = Array.isArray(data)? data.filter(f => f['groupID'] === selected): [];
    
    return (
        <div className="w-full mb-6">
            <div className="flex justify-between">
                {Array.isArray(title) &&
                    <select 
                    onChange={(e) => setSeleted(e.target.value)}
                    name="title" 
                    id="title" 
                    className=" bg-blue-200 font-semibold border-none text-blue-800 dark:text-white dark:bg-gray-600 rounded-t-md">
                        {title.map((t, i) => (
                            <option key={i} value={t['_id'].$oid}>{t['name']}</option>
                        ))}
                    </select>}

                <div className="flex gap-4 hover:cursor-pointer">
                    <AddButton type={type} id={id}/>
                </div>
            </div>

            <ul className="divide-y p-2 rounded-b-md divide-gray-200 dark:divide-gray-700 bg-blue-50 dark:bg-gray-700 dark:border dark:border-gray-600">
                {dataFilter.length > 0  ? dataFilter.map((item, i) => (
                    <Item
                        key={i}
                        item={item}
                    />
                ))
                :<p className="text-center text-gray-500 font-semibold">Chưa có món ăn nào</p>}
            </ul>
        </div>
    )
}
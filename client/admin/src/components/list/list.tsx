import React from "react";
import { AddButton, Item, SearchModal } from "../../components";

export default function List({ title, data, type, id }: { title: Array<string>, data: Array<Object>, type: string, id:string }) {
    return (
        <div className="w-full mb-6">
            <div className="flex justify-between">
                {title.length > 0 &&
                    <select name="title" id="title" className=" bg-blue-200 font-semibold border-none text-blue-800 dark:text-white dark:bg-gray-600 rounded-t-md">
                        {title.length > 0 && title.map((t, i) => (
                            <option key={i} value={t}>{t}</option>
                        ))}
                    </select>}

                <div className="flex gap-4 hover:cursor-pointer">
                    <AddButton type={type} id={id}/>
                    <SearchModal/>
                </div>
            </div>

            <ul className="divide-y p-2 rounded-b-md divide-gray-200 dark:divide-gray-700 bg-blue-50 dark:bg-gray-700 dark:border dark:border-gray-600">
                {data && data.map((item, i) => (
                    <Item
                        key={i}
                        name={item['name']}
                        image={'https://i.pinimg.com/564x/93/02/83/9302838a98cf9e779ae4439f7ef48eab.jpg'}
                        link={item['_id']?.$oid}
                        voted={item['voted']}
                    />
                ))
                }
            </ul>
        </div>
    )
}
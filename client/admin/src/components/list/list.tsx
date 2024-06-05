import React from "react";
import { Item, SearchModal } from "../../components";
import { Link } from "react-router-dom";

export default function List({ title, data, type }: { title: Array<string>, data: Array<Object>, type: string }) {
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
                    <Link to={`/${type}/add`}>
                        <svg className="w-8 h-8 text-blue-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857ZM18 14a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2Z" clip-rule="evenodd" />
                        </svg>
                    </Link>
                    <SearchModal/>
                </div>
            </div>

            <ul className="divide-y p-2 rounded-b-md divide-gray-200 dark:divide-gray-700 bg-blue-50 dark:bg-gray-700 dark:border dark:border-gray-600">
                {data && data.map((item, i) => (
                    <Item
                        key={i}
                        name={item['name']}
                        image={item['image']}
                        link={item['link']}
                        tag={item['tag']}
                        voted={item['voted']}
                    />
                ))
                }
            </ul>
        </div>
    )
}
import React from "react";
import { useQuery } from "react-query";
import { getUserApi } from "../../api/user";
import { AccItem, SearchAccount } from "../../components";

export default function AccTable({ type, filter }: { type: string, filter: string }) {
    const { data: users} = useQuery(type, () => getUserApi(type));

    const usersFilter = Array.isArray(users) && users?.sort((a: Object, b: Object) =>
        filter === 'A-Z' ? String(a['name']).localeCompare(b['name']) : String(b['name']).localeCompare(a['name']));
    
    return (
        users && Array.isArray(usersFilter) &&
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            
            <SearchAccount filter={usersFilter} type={type}/>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            Tên tài khoản
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Số điện thoại
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Chức vụ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Thêm
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(usersFilter)&& usersFilter.map((item, i) => (
                        <AccItem key={i} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
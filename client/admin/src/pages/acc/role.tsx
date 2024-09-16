import React from "react";
import { getRoleApi } from "../../api/user";
import { useQuery } from "react-query";
import { RoleItem, RoleModal, BackButton } from "../../components";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function Role() {
    const user = useSelector(selectUser);
    const { data: roles } = useQuery('roles', () => getRoleApi())

    return (
        user && roles &&
        <div>
             <div className="fixed ml-1 top-32">
                <BackButton />
            </div>
            <div className="mb-6">
                <p className="text-center text-gray-900 dark:text-white font-bold text-lg mb-6">Chức vụ</p>
                <div className="flex justify-end md:mr-20 mr-10">
                    <RoleModal type="add" roleItem={{}} roles={roles} />
                </div>
            </div>

            <div className="relative md:mx-20 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                STT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên chức vụ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mô tả
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thêm
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(roles) && roles.map((item, i) => (
                            <RoleItem key={i} item={item} index={i} roles={roles} />
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};
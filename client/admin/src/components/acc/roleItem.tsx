import React from "react";
import { useMutation } from "react-query";
import { deleteRoleApi } from "../../api/user";
import { Delete, RoleModal } from "../../components";

export default function RoleItem({item, index, roles}:{item:Object, index:number, roles:Array<Object>}) {
     const deleteRole = useMutation(
        deleteRoleApi, {
        onSuccess: (data) => {
            if (data === 'successfull') {
                document.location.reload()
            }
        },
        onError: (err) => {
            console.log(err);
        }
    }
    )

    const handleDlete = (res: boolean) => {
        if (res) {
            deleteRole.mutate(item['_id'].$oid)
        }
    };
    return (
        item &&
        <tr
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
            </th>
            <td className="px-6 py-4">
                {item['_id'].$oid}
            </td>
            <td className="px-6 py-4">
                {item['role']}
            </td>
            <td className="px-6 py-4">
                {item['description']}
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-end md:mr-20 mr-10">
                    <RoleModal type="edit" roleItem={item} roles={roles} />
                    <Delete name={item['role']} res={handleDlete} />
                </div>
            </td>
        </tr>
    );
};
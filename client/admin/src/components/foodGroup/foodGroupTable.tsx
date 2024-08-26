import React from "react";
import { Delete, FGroupEditForm } from '../../components';
import { deleteFoodGroupItem } from "../../api/foodApi";
import { useMutation } from "react-query";

export default function FGroupTable({item}:{item:Object}) {

    const foodGroupDelete = useMutation(
        deleteFoodGroupItem, {
        onSuccess: (data) => {
            if (data === "successfull") {
                document.location.reload()
            }
        },
        onError(err) {
            alert(err)
        },
    }
    )
    const handleDeleteFoodGroup = (res: boolean) => {
        if (res) {
            foodGroupDelete.mutate(item['_id'].$oid)
        }
    }
    return (
        <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item['name']}
            </th>
            <td className="px-6 py-4">
                {item['_id'].$oid}
            </td>
            <td className="px-6 py-4 flex justify-between">
                <FGroupEditForm item={item} />
                <Delete name={item['name']} res={handleDeleteFoodGroup} />
            </td>
        </tr>
    );
}
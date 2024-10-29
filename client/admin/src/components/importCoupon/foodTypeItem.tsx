import React, { RefCallback } from "react";
import { Delete } from '../../components';
import { useMutation } from "react-query";
import { deleteFoodTypeApi } from "../../api/foodTypeApi";

export default function FoodTypeItem({ item, selected }: { item: Object, selected: RefCallback<Object> }) {

    const foodTypeDelete = useMutation(
        deleteFoodTypeApi, {
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
    const handleDeleteFoodType = (res: boolean) => {
        if (res) {
            foodTypeDelete.mutate(item['_id'].$oid)
        }
    }

    return (
        item && item['_id'] &&
        <tr
            onClick={() => selected(item)}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item['name']}
            </th>
            <td className="px-6 py-4">
                {item['_id']['$oid']}
            </td>
            <td className="px-6 py-4 flex justify-between">
                <Delete name={item['name']} res={handleDeleteFoodType} />
            </td>
        </tr>
    );
}
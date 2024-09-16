import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { Delete } from "../../components";
import { deleteUserApi } from "../../api/user";

export default function AccItem({item}:{item:Object}) {
    
    const { data: imageFile } = useQuery(item && item['image']? item['image']:'accImage', 
        () => downloadApi(item && item['image']? item['image']:'food.jpg'));
   
    const deleteUser = useMutation(
        deleteUserApi, {
            onSuccess(data) {
                if (data === 'successfull') {
                    document.location.reload()
                } else alert(data)
            },
            onError: (err) => { console.log(err) }
        }
    )
    const handleDelete = (res:boolean) => {
        if (res) {
            const values = {
                type: String(item['role']).toLocaleLowerCase(),
                id: item['_id'].$oid,
            }
            deleteUser.mutate(values)
        }
    }
    return(
        item && imageFile &&
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4">
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full" src={URL.createObjectURL(imageFile)} alt="acc" />
                <div className="ps-3 text-base font-semibold">
                    {item['name']}
                </div>
            </div>
        </td>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item['phone']}
        </th>
        <td className="px-6 py-4">
            {item['email']}
        </td>
        <td className="px-6 py-4">
            {item['role']}
        </td>
        <td className="px-6 py-4 flex gap-4">
            <Link to={`/acc/${String(item['role']).toLocaleLowerCase()}/${item['_id']?.$oid}`}>
            <div className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">
                Chi tiết
            </div>
            </Link>
            <Delete name={item['name']} res={handleDelete} />
        </td>
    </tr>
    );
};
import React from "react";
import { Link } from "react-router-dom";
import { Rate } from 'antd';
import { Delete } from "../../components";
import { useQuery, useMutation } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { deleteFoodApi } from "../../api/foodApi";

export default function Item({ name, image, id, voted }: { name: string, image: string, id: string, voted: number }) {
        
    const deleteFood = useMutation({
            mutationFn: deleteFoodApi,
            onSuccess(data) {
                if (data === 'successfull') {
                    document.location.reload()
                } else alert(data)
            },
            onError: (err) => { console.log(err) }
        })
    const handleDelete = (res: boolean) => {
       if (res) {
        deleteFood.mutate(id)
       }
    }

    const { data: imageFile } = useQuery(image, () => downloadApi(image? image: 'food.jpg'))
    return (
        imageFile &&
        <div className="flex justify-between rounded-md hover:bg-blue-200 dark:hover:bg-gray-800">
            <div className="flex-1">
                <Link to={`/food/detail/${id}`}>
                    <div className="p-2 h-full  cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-lg" src={URL.createObjectURL(imageFile)} alt={name} />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {name}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {<Rate allowHalf defaultValue={voted} />}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="p-2">
                <Delete name={name} res={handleDelete} />
            </div>
        </div>
    )
}
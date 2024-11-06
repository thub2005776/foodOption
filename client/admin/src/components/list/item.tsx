import React from "react";
import { Link } from "react-router-dom";
import { Delete, UpdatedStoredFoodModal } from "../../components";
import { useQuery, useMutation } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { deleteFoodApi } from "../../api/foodApi";

export default function Item({ item }: { item:Object}) {
        
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
        deleteFood.mutate(item['_id']['$oid'])
       }
    }

    const { data: imageFile } = useQuery(item['image'], () => downloadApi(item['image']));
    const image = 'https://i.pinimg.com/736x/10/50/cd/1050cdf0d4bb8a8c99858ca280e61920.jpg';
    return (
        imageFile && item &&
        <div className="flex justify-between rounded-md hover:bg-blue-200 dark:hover:bg-gray-800">
            <div className="flex-1">
                <Link to={`/food/detail/${item['_id']['$oid']}`}>
                    <div className="p-2 h-full  cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-lg" src={imageFile instanceof Blob? URL.createObjectURL(imageFile):image } alt='food' />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {item['name']}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="p-2 flex gap-4">
            <UpdatedStoredFoodModal food={item} />
                <Delete name={item['name']} res={handleDelete} />
            </div>
        </div>
    )
}
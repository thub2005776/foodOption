import React from "react";
import { Link } from "react-router-dom";
import { FavoritedButton, Rating } from '../../components';
import { useQuery } from "react-query";
import { downloadApi} from "../../api/uploadFileApi";

export default function FoodCard({ food }: { food: Object }) {

    const { data: imageFile } = useQuery(food['image'] ? food['_id'].$oid : 'foodImage', () => downloadApi(food['image'] ? food['image'] : 'food.jpg'));

    const handleFavortied = (result: boolean) => {
        console.log(result);

    }

    console.log(imageFile);
    const image = new Blob(imageFile, { type: 'image/jpeg' })

    return (
        food && imageFile && 
        <div className="w-fit relative p-1 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/food/${food['_id']?.$oid}`}>
                <img className="rounded-t-lg w-60 h-64"
                    src={URL.createObjectURL(image)} alt="food" />
            </Link>

            <div className="absolute top-5 right-4">
                <FavoritedButton liked={handleFavortied} />
            </div>

            <div className="rounded-b-lg p-2">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {food['name']}
                </h5>
                <div className="flex justify-between">
                     <p className="mb-3 font-bold text-red-600 dark:text-red-500">
                    {food['price']} đ
                </p>
                <p className="text-gray-600">{food['sold']} Lượt bán</p>
                </div>
               
                <div className="flex justify-around">
                    <Rating
                        rate={food['rating']}
                        amount={0} />
                    <Link to={`/food/id`}>
                    <div className="p-1 rounded-lg bg-orange-500 dark:bg-orange-400">
                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.268 6A2 2 0 0 0 14 9h1v1a2 2 0 0 0 3.04 1.708l-.311 1.496a1 1 0 0 1-.979.796H8.605l.208 1H16a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L4.686 5H4a1 1 0 0 1 0-2h1.5a1 1 0 0 1 .979.796L6.939 6h5.329Z" />
                            <path d="M18 4a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0V8h2a1 1 0 1 0 0-2h-2V4Z" />
                        </svg>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
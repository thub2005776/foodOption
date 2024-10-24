import React from "react";
import { selectUser} from "../../features/userSlice";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { FavoritedItem, Sidebar } from "../../components";
import { getFavoritedFoodByUidApi } from "../../api/favoritedFoodApi";


export default function Favorited() {
    const user = useSelector(selectUser);

    const { data: favorited } = useQuery('favorited', () => getFavoritedFoodByUidApi(user['_id']['$oid']));

    return (
        user && favorited &&
        <div className="">
            {/* sidebar */}
            <Sidebar />

            <div className="p-4 sm:ml-64 ">
                <div className="flex flex-wrap gap-2">
                    {Array.isArray(favorited) && favorited.length > 0 ? favorited.map((item, i) => (
                        <FavoritedItem key={i} item={item} />))
                        : <p className="text-gray-600 text-center my-28 ms-[30rem]">Chưa có món ăn nào trong mục yêu thích</p>}
                </div>
            </div>
        </div>
    )
}
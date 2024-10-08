import React, { RefCallback, useState } from "react";
import { getFavoritedFoodByUidApi } from "../../api/favoritedFoodApi";
import { useQuery } from "react-query";

export default function FavoritedButton({ login,foodID,  liked }: { login: boolean, foodID:string, liked: RefCallback<boolean> }) {
    const {data: favorites} = useQuery(foodID, () => getFavoritedFoodByUidApi(login['_id'].$oid))

    const favorited = Array.isArray(favorites) && favorites.find(f => f['foodID'] === foodID);

    const [like, setLike] = useState(false);

    const handleremoved = () => {
        setLike(!like);
        liked(false);
    }

    const handleAdd = () => {
        if (login) {
            setLike(!like);
            liked(true);
        } else { alert('Hãy đăng nhập trước khi thêm vào yêu thích.')}

    }
    return (
        <div className="p-2 rounded-full bg-gray-100/35">
            {like || favorited?
                <div onClick={handleremoved}>
                    <svg
                        className="w-7 h-7 text-red-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                    </svg>
                </div>
                :
                <div onClick={handleAdd}>
                    <svg
                        className="w-6 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                    </svg>
                </div>}
        </div>
    )
}
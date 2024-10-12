import React from "react";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { CartItem } from "../../components";
import { useQuery } from "react-query";
import { getCartByUidApi } from "../../api/cartApi";

export default function Cart() {
    const user = useSelector(selectUser);
    const { data: cart } = useQuery('cart', () => getCartByUidApi(user['_id'].$oid));

    const handleChecked = (checked:Object) => {
        console.log(checked);
    }
    return (
        user && cart &&
        <div className="lg:mx-20 mx-10">
            <div className="mt-10">
                <ul>
                    {Array.isArray(cart['detail']) && cart['detail'].map((item, i) => (
                        <CartItem key={i} userID={user['_id'].$oid} item={item} index={i} checkedIndex={handleChecked}/>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between p-2 bg-blue-100 dark:bg-blue-500 rounded-b-lg">
                <p className="text-blue-700 font-bold dark:text-white">
                    <span className="py-0.5 px-2 rounded-full bg-green-500 text-white">1</span>
                    Đã chọn
                </p>
                <div className="flex justify-center gap-2">
                    <p className="text-red-600 dark:text-red-100 font-semibold">25.000đ</p>
                    <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
};
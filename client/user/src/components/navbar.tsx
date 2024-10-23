import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { SearchModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { useMutation, useQuery } from "react-query";
import { logoutApi } from "../api/authActions";
import { downloadApi } from "../api/uploadFileApi";
import { getCartByUidApi } from "../api/cartApi";
import { getFoodApi } from "../api/foodApi";


export default function Navbar() {
    const navigate = useNavigate();
    const logoutQuery = useMutation(
        logoutApi, {
        onSuccess: (data) => {
            if (data !== "Cookie don't exist.") {
                dispatch(logout());
                navigate('/');
            } else alert(data)
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleLogout = () => {
        logoutQuery.mutate()
    }

    const { data: imageFile } = useQuery(user && user['image'], () => downloadApi(user ? user['image'] : 'avatar.jpg'))
    const { data: cart } = useQuery('cart', () => getCartByUidApi(user && user['_id'].$oid))
    const { data: food } = useQuery('food', () => getFoodApi());

    const imageLink = "https://i.pinimg.com/564x/26/bc/2d/26bc2d1c56c34124378a5a853e26627a.jpg"


    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            FoodOpt
                        </span>
                    </Link>
                    <div className="me-10 lg:me-0 flex space-x-10 rtl:space-x-reverse">
                        <Link to={'/foodopt'}>
                            <p className="text-lg font-bold cursor-pointer text-gray-900 hover:text-blue-800 dark:text-gray-600 dark:hover:text-gray-400">
                                Gợi ý
                            </p>
                        </Link>
                        <Link to={'/trend'}>
                            <p className="text-lg font-bold cursor-pointer text-gray-900 hover:text-blue-800 dark:text-gray-600 dark:hover:text-gray-400">
                                Món ăn
                            </p>
                        </Link>
                        {user && <Link to={`acc/${user['_id']['$oid']}/ordered`}>
                            <p className="text-lg font-bold cursor-pointer text-gray-900 hover:text-blue-800 dark:text-gray-600 dark:hover:text-gray-400">
                                Đơn hàng
                            </p>
                        </Link>}
                    </div>

                    <div className="me-10 lg:me-0 flex space-x-3 rtl:space-x-reverse">
                        <SearchModal type="food" data={food} />
                        {user ?
                            <div className="flex">
                                <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                                <Link to={`/cart/${user['_id'].$oid}`}>
                                    <button
                                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500  dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                        <span className="relative  transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md bg-opacity-0">
                                            <svg className="w-6 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                            </svg>
                                        </span>
                                        {cart && Array.isArray(cart['detail']) && cart['detail'].length > 0 &&
                                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                                {cart['detail'].length}
                                            </div>}
                                    </button>
                                </Link>
                                <Link to={`/acc/${user['_id'].$oid}`}>
                                    <img src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : imageLink}
                                        className=" h-8 w-8 rounded-full" alt="avatar" />
                                </Link>
                            </div>
                            : <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => navigate('/login')}>
                                Đăng nhập
                            </button>}
                    </div>

                </div>
            </nav>
        </div>
    );
}
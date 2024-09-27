import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { SearchModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { useMutation } from "react-query";
import { logoutApi } from "../api/authActions";


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
                        <Link to={'/topseller'}>
                            <p className="text-lg font-bold cursor-pointer text-gray-900 hover:text-blue-800 dark:text-gray-600 dark:hover:text-gray-400">
                                Top Bán Chạy
                            </p>
                        </Link>
                    </div>
                    {user ?
                        <div className="me-10 lg:me-0 flex space-x-3 rtl:space-x-reverse">
                            <SearchModal />
                            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={handleLogout}>
                                Đăng xuất
                            </button>
                            <Link to={`/acc/${user['_id'].$oid}`}>
                                <img src={user['imageLink'] ? user['imageLink'] : imageLink}
                                    className=" h-8 w-8 rounded-full" alt="Flowbite Logo" />
                            </Link>
                        </div>
                        : <div className="me-10 lg:me-0 flex space-x-3 rtl:space-x-reverse">
                            <SearchModal />
                            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => navigate('/login')}>
                                Đăng nhập
                            </button>
                        </div>}
                </div>
            </nav>
        </div>
    );
}
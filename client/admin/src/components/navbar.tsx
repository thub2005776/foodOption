import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { SearchModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { useMutation } from "react-query";
import { logoutApi } from "../api/authActions";


export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutQuery = useMutation(
        logoutApi, {
            onSuccess: (data) => {
                if(data !== "Cookie don't exist.") {
                    dispatch(logout());
                    navigate('/');
                } else alert(data)
            },
            onError: (err) => {
                console.log(err);
            },
        });

    const user = useSelector(selectUser);
    
    const handleLogout = () => {
       logoutQuery.mutate()
    }
   
    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FoodOpt</span>
                    </Link>
                    {user &&
                        <div className="me-10 lg:me-0 flex space-x-3 rtl:space-x-reverse">
                        <SearchModal/>
                        <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={handleLogout}>
                            Đăng xuất
                        </button>
                        <img src="https://i.pinimg.com/564x/77/00/f0/7700f043a15ac6b34d952eca997d7725.jpg"
                            className=" h-8 w-8 rounded-full" alt="Flowbite Logo" />
                    </div>}
                </div>
            </nav>
        </div>
    );
}
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { logoutApi } from "../../api/authActions";
import { deleteAddressByUidApi, deleteUserApi } from "../../api/user";
import { Delete } from "../../components";
import { deleteCartApi } from "../../api/cartApi";

export default function Sidebar() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutQuery = useMutation(
        logoutApi, {
        onSuccess: (data) => {
            if (data === "Logout successfull") {
                dispatch(logout());
                navigate('/');
            } else alert(data)
        },
        onError: (err) => {
            console.log(err);
        },
    });
    const handleLogout = () => {
        logoutQuery.mutate()
    }

    const deleteCart = useMutation(
        deleteCartApi, {
        onSuccess(data, variables, context) {
            if (data === 'successfull')
                console.log(data);
        }, onError(error, variables, context) {
            console.log(error);
        },
    }
    )


    const deleteAddress = useMutation(
        deleteAddressByUidApi, {
        onSuccess(data, variables, context) {
            if (data === 'successfull')
                console.log(data);
        }, onError(error, variables, context) {
            console.log(error);
        },
    }
    )

    const deleteAcc = useMutation(
        deleteUserApi, {
        onSuccess(data, variables, context) {
            console.log(data);
            if (data === 'successfull') {
                navigate('/')
            document.location.reload()
            }
                
        }, onError(error, variables, context) {
            console.log(error);
        },
    }
    )

    const handleDeleteAcc = (res: boolean) => {
        if (res) {
            const values = {
                type: 'user',
                id: user['_id']['$oid'],
            }
            deleteAddress.mutate(values);
            deleteCart.mutate(values.id);
            deleteAcc.mutate(values);
        }
    }
    return (
        <aside id="default-sidebar" className="fixed top-32 left-0 z-40 w-64 h-fittransition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to={`/acc/${user['_id'].$oid}`}>
                            <div
                                className="flex items-center p-2 hover:cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="ms-3">Tài khoản của tôi</span>
                            </div>
                        </Link>

                    </li>

                    <li>
                        <Link to={`/acc/${user['_id'].$oid}/ordered`}>
                            <div
                                className="flex items-center p-2 hover:cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Đơn hàng</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/acc/${user['_id'].$oid}/favorited`}>
                            <div
                                className="flex items-center p-2 hover:cursor-pointer text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Yêu thích</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <div
                            onClick={handleLogout}
                            className="flex items-center p-2 hover:cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Đăng xuất</span>
                        </div>
                    </li>
                    <li>
                        <Delete name="Tài khoản" action="Xoá tài khoản" res={handleDeleteAcc} />
                    </li>

                </ul>
            </div>
        </aside>
    )
}
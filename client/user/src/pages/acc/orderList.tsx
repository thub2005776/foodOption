import React, { useState } from "react";
import { selectUser, logout } from "../../features/userSlice";
import { useMutation, useQuery } from "react-query";
import { logoutApi } from "../../api/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrderByUidApi } from "../../api/orderApi";
import { Orderes } from "../../components";



export default function OrderList() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: orderes } = useQuery('orderes', () => getOrderByUidApi(user['_id'] && user['_id'].$oid))

    const [tab, setTab] = useState('all');
    const status = [
        { tab: 'all', title: 'Tất cả' },
        { tab: 'pending', title: 'Chờ duyệt' },
        { tab: 'processing', title: 'Đang xử lý' },
        { tab: 'preparing', title: 'Đang chuẩn bị' },
        { tab: 'delivering', title: 'Đang giao' },
        { tab: 'completed', title: 'Hoàn thành' },
        { tab: 'canceled', title: 'Đã huỷ' },
    ]

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

    const handleDeleteAcc = () => {

    }

    return (
        user && orderes &&
        <div className="">
            {/* sidebar */}
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
                                    className="flex items-center p-2 hover:cursor-pointer text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Đơn hàng</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <div
                                onClick={() => setTab('inbox')}
                                className="flex items-center p-2 hover:cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Thông báo</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    3
                                </span>
                            </div>
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
                            <button
                                onClick={handleDeleteAcc}
                                type="button"
                                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Xoá tài khoản
                            </button>
                        </li>

                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64 ">
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                        {status.map((item, i) => (
                            <li key={i} onClick={() => setTab(item.tab)} className="me-2">
                                <div className={`
                            ${tab === item.tab ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500"
                                        : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    } inline-block p-4 `}>
                                    {item.title}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* OrderList */}
                <Orderes type={tab} orderes={orderes} />
            </div>
        </div>
    )
}
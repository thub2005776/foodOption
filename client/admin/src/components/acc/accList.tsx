import React, { useState } from "react";
import { AccTable } from "../../components";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useQuery } from "react-query";
import { getRoleApi } from "../../api/user";

export default function AccList() {
    const auth = useSelector(selectUser);
    const { data: roles } = useQuery('roles', () => getRoleApi());

    const selection = ['A-Z', 'Z-A'];

    const [selected, setSelected] = useState(selection[0]);
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(Array.isArray(roles) ? roles[0].role : 'User');

    const StaffRightsException = { auth: 'staff', role: 'admin', roleDetail: 'impt' }

    return (
        auth && roles &&
        <div>
            {(auth['roleDetail'] === 'impt' || auth['roleDetail'] === 'admin') ?
                <div>
                    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                            {Array.isArray(roles) && roles.map((item, i) => (
                                <li
                                    key={i}
                                    className="me-2">
                                    <button
                                        onClick={() => setTab(item['role'])}
                                        disabled={String(auth['role']).toLocaleLowerCase() === StaffRightsException.auth &&
                                            item['role'] === StaffRightsException.role &&
                                            item['roleDetail'] !== StaffRightsException.roleDetail
                                        }
                                        className={
                                            `${tab !== item['role'] ?
                                                'text-gray-600' : 'text-blue-600 border-blue-600'} 
                                    ${String(auth['role']).toLocaleLowerCase() === 'staff' && (item['role'] === 'Admin' || item['role'] === 'Staff') && 'hidden'}
                                inline-block p-4 border-b-2 rounded-t-lg`}
                                    >{item['role']}
                                    </button>
                                </li>))}
                        </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" >
                        <div className="flex justify-between">
                            <div className="relative mb-2">
                                <button
                                    onClick={() => setOpen(!open)}
                                    id="dropdownRadioButton"
                                    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                    </svg>
                                    {selected}
                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                {open &&
                                    <div
                                        id="dropdownRadio"
                                        className="absolute z-[100] w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" >
                                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 cursor-pointer" >
                                            {selection.map((item, i) => (
                                                <li key={i}
                                                    onClick={() => {
                                                        setSelected(item)
                                                        setOpen(false)
                                                    }}>
                                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                        {item}
                                                    </div>
                                                </li>))}
                                        </ul>
                                    </div>}
                            </div>

                            <div className="flex gap-5">
                                <div className="w-6 h-6 ">
                                    {tab === 'Admin' &&
                                        <Link to={`/acc/role`}>
                                            <svg className="w-6 h-6 cursor-pointer text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clipRule="evenodd" />
                                            </svg>
                                        </Link>}
                                </div>

                                <Link to={`/acc/${String(tab).toLocaleLowerCase()}/add`}>
                                    <svg className="w-6 h-6 cursor-pointer text-blue-600 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857ZM18 14a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2Z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <AccTable
                            filter={selected}
                            type={String(tab).toLocaleLowerCase()} />
                    </div>
                </div>
                : <div>
                    <p className="text-center font-bold text-gray-600 py-32">Bạn không đủ quyền hạn truy cập vào đây</p>
                </div>}

        </div>
    )
}
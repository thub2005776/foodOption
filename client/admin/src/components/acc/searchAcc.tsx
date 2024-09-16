import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchAccount({ filter, type }: { filter: Array<Object>, type: string }) {

    const [open, setOpen] = useState(false);
    const [searchResult, setSearchResult] = useState([{}]);

    const handleSearch = (input: string) => {
        const name = filter.filter(f => String(f['name']).toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        const phone = filter.filter(f => String(f['phone']).includes(input));
        const email = filter.filter(f => String(f['email']).toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        const role = filter.filter(f => String(f['role']).toLocaleLowerCase().includes(input.toLocaleLowerCase()));

        setSearchResult(name || phone || email || role || null)
        if (input.length === 0) {
            setSearchResult([])
        }

    }

    return (
        <div className="">


            {/* <!-- Modal toggle --> */}
            <button
                onClick={() => setOpen(true)}
                className="relative float-end mb-4">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <div
                    className="block cursor-pointer pt-2 ps-10 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50  dark:bg-gray-700 dark:border-gray-600"
                >Search for users</div>
            </button>

            {/* <!-- Main modal --> */}
            {open &&
                <div id="select-modal" className="overflow-y-auto overflow-x-hidden z-[100] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="fixed top-[30%] right-4 p-4 w-full max-w-md max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <div className="flex justify-center relative">
                                    <label htmlFor="table-search" className="sr-only">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input
                                            onChange={(e) => handleSearch(e.target.value)}
                                            type="text"
                                            id="table-search-users"
                                            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                            placeholder="Search for users" />
                                    </div>

                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-4 md:p-5">
                                <ul className="space-y-4 mb-4">
                                    {searchResult.length > 0?
                                        searchResult.map((item, i) => (
                                            <li key={i}>
                                                <Link to={`/acc/${type}/${item['_id']?.$oid}`}>
                                                <label htmlFor="job-1" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                                    <div className="block">
                                                        <div className="w-full text-lg font-semibold">{item['name']}</div>
                                                        <div className="w-full text-gray-500 dark:text-gray-400">{item['email']}</div>
                                                    </div>
                                                    <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                                </label>
                                                </Link>
                                            </li>)):
                                        <p className="text-gray-900 dark:text-gray-400 text-center">Không tìm thấy</p>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
};
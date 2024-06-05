import React from "react";

export default function AccForm() {
    return (
        <form className=" mx-2 dark:bg-gray-800 p-4 rounded-md">
            <div className="mb-6">
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-64 h-64 lg:w-96 lg:h-72 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <img className="w-64 h-64 rounded-lg"
                                src="https://i.pinimg.com/564x/3b/81/86/3b8186188b75e07dff705f1762bdd85e.jpg" alt="" />
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept="image/*" />
                    </label>
                </div>

            </div>
            <div className="mx-auto">
                
            </div>
            
            <p className="text-gray-900 dark:text-gray-400 text-center font-semibold mb-2">Thông tin</p>
            <div className="">
                <div className="mb-5">
                    <label htmlFor="drive" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Link Google Drive
                    </label>
                    <input type="drive" id="drive" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tên tài khoản
                    </label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                    </label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required />
                </div>
                <div className="mb-5">
                    <label htmlFor="info" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Thông tin khác
                    </label>
                    <textarea id="info" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >

                    </textarea>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Submit
                </button>
            </div>
        </form>
    )
}